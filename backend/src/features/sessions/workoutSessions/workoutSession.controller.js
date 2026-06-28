import mongoose from "mongoose";

import Program from "../../programs/Program.model.js";
import Workout from "../../workouts/Workout.model.js";
import Exercise from "../../exercises/Exercise.model.js";

import WorkoutSession from "./WorkoutSession.model.js";
import ExerciseSession from "../exerciseSessions/ExerciseSession.model.js";

import { createExerciseSessionsFromExercises } from "../exerciseSessions/exerciseSession.service.js";

export const createWorkoutSession = async (req, res) => {
    const { workoutId, programId } = req.params;

    if (!mongoose.isValidObjectId(programId)) {
        return res.status(400).json({ error: 'Invalid program id.' });
    }

    if (!mongoose.isValidObjectId(workoutId)) {
        return res.status(400).json({ error: 'Invalid workout id.' });
    }

    const session = await mongoose.startSession();

    try {
        const activeWorkoutSession = await WorkoutSession.findOne({
            user: req.userId,
            status: 'in-progress'
        });

        if (activeWorkoutSession) {
            return res.status(409).json({
                error: 'You already have an active workout session. Complete or cancel it before starting a new workout.',
                activeWorkoutSession
            })
        }

        const program = await Program.findOne({
            user: req.userId,
            _id: programId
        });

        if (!program) {
            return res.status(404).json({ error: 'Program not found.' });
        }

        const workout = await Workout.findOne({
            user: req.userId,
            program: programId,
            _id: workoutId
        });

        if (!workout) {
            return res.status(404).json({ error: 'Workout not found.' });
        }
        const exercises = await Exercise.find({
            user: req.userId,
            workout: workoutId
        });

        if (exercises.length < 1) {
            return res.status(404).json({ error: 'Workout contains no exercises.' })
        }

        session.startTransaction();

        const [workoutSession] = await WorkoutSession.create([{
            user: req.userId,
            program: programId,
            workout: workout._id,
            workoutNameSnapshot: workout.name,
            workoutOrderSnapshot: workout.order,
            workoutDurationSnapshot: workout.duration,
        }], { session });

        const exerciseSessions = await createExerciseSessionsFromExercises({
            exercises,
            session,
            user: req.userId,
            workoutSession: workoutSession._id,
        });

        await session.commitTransaction();
        return res.status(201).json({ workoutSession, exerciseSessions });
    }

    catch (error) {
        await session.abortTransaction();
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }

    finally {
        session.endSession();
    }
}

export const getActiveWorkoutSession = async (req, res) => {
    try {
        const workoutSession = await WorkoutSession.findOne({
            user: req.userId,
            status: 'in-progress',
        });

        if (!workoutSession) {
            return res.status(200).json({
                workoutSession: null,
                exerciseSessions: []
            });
        }

        const exerciseSessions = await ExerciseSession.find({
            user: req.userId,
            workoutSession: workoutSession._id,
        }).sort({ orderSnapshot: 1 });

        return res.status(200).json({
            workoutSession,
            exerciseSessions,
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
}

export const getWorkoutSessionById = async (req, res) => {
    const { workoutSessionId } = req.params;

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        return res.status(400).json({ error: 'Invalid workout session id.' })
    }

    try {
        const workoutSession = await WorkoutSession.findOne({
            user: req.userId,
            _id: workoutSessionId,
        });

        if (!workoutSession) {
            return res.status(404).json({ error: 'Workout session not found.' });
        };

        const exerciseSessions = await ExerciseSession.find({
            user: req.userId,
            workoutSession: workoutSession._id,
        }).sort({ orderSnapshot: 1 });

        return res.status(200).json({
            workoutSession,
            exerciseSessions
        });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
}

export const completeWorkoutSession = async (req, res) => {
    const { workoutSessionId } = req.params;

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        return res.status(400).json({ error: 'Invalid workout session id.' });
    }

    try {
        const workoutSession = await WorkoutSession.findOneAndUpdate(
            {
                user: req.userId,
                _id: workoutSessionId,
                status: 'in-progress',
            },

            {
                status: 'completed',
                completedAt: new Date(),
            },

            {
                new: true,
                runValidators: true,
            }
        );

        if (!workoutSession) {
            return res.status(404).json({ error: 'Active workout session not found.' });
        }

        return res.status(200).json({ workoutSession });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
}