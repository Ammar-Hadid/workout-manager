import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";

import exerciseValidator from "../utils/validators/exerciseValidator.js";

export const getExercisesByWorkoutId = async (req, res) => {
    const { workoutId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return res.status(400).json({ error: 'Invalid workout id.' })
    }

    try {
        const workout = await Workout.findOne({ user: req.userId, _id: workoutId });
        if (!workout) return res.status(404).json({ error: 'Workout not found.' })

        const exercises = await Exercise
            .find({ user: req.userId, workout: workoutId })
            .sort({ order: 1 });

        return res.status(200).json({ exercises })
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
};

export const getExerciseById = async (req, res) => {
    const { workoutId, exerciseId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return res.status(400).json({ error: 'Invalid workout id' });
    }

    if (!mongoose.isValidObjectId(exerciseId)) {
        return res.status(400).json({ error: 'Invalid exercise id' });
    }

    try {
        const exercise = await Exercise
            .findOne({ user: req.userId, workout: workoutId, _id: exerciseId });

        if (!exercise) return res.status(404).json({ error: 'Exercise not found.' });

        return res.status(200).json({ exercise })
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' })
    }
};

export const createExercise = async (req, res) => {
    const { workoutId } = req.params;

    const { name, muscleGroup, restTime, sets, minReps, maxReps } = req.body;

    if (!mongoose.isValidObjectId(workoutId)) {
        return res.status(400).json({ error: 'Invalid workout id.' });
    }

    const errors = exerciseValidator(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }

    try {
        const workout = await Workout.findOne({ user: req.userId, _id: workoutId });

        if (!workout) return res.status(404).json({ error: 'Unable to create exercise because the parent workout was not found.' });

        const lastExercise = await Exercise.findOne({ user: req.userId, workout: workoutId }).sort({ order: -1 })

        const exercise = await Exercise.create(
            {
                user: req.userId,
                workout: workoutId,
                order: lastExercise ? lastExercise.order + 1 : 1,
                name: name.trim(),
                muscleGroup,
                restTime: Number(restTime),
                sets: Number(sets),
                minReps: Number(minReps),
                maxReps: Number(maxReps)
            }
        );

        return res.status(201).json({ exercise });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
};

