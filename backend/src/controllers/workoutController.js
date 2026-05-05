import mongoose, { mongo } from "mongoose";
import Workout from "../models/Workout.js";
import Program from "../models/Program.js";

import workoutValidator from "../utils/validators/workoutValidator.js";

export const getWorkoutById = async (req, res) => {
    const { workoutId, programId } = req.params;

    if (!mongoose.isValidObjectId(workoutId)) {
        return res.status(400).json({ error: 'Invalid workout id.' });
    }

    try {
        const workout = await Workout.findOne({ user: req.userId, _id: workoutId, program: programId });

        if (!workout) return res.status(404).json({ error: 'Workout not found.' });

        return res.status(200).json({ workout });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const getWorkoutsByProgramId = async (req, res) => {
    const { programId } = req.params;

    if (!mongoose.isValidObjectId(programId)) {
        return res.status(400).json({ error: 'Invalid program id' });
    };

    try {
        const workouts = await Workout.find({ user: req.userId, program: programId }).sort({ order: 1 })

        return res.status(200).json({ workouts })
    }

    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' })
    }
};

export const createWorkout = async (req, res) => {
    const { programId } = req.params;
    const { name, duration } = req.body;

    if (!mongoose.isValidObjectId(programId)) {
        return res.status(400).json({ error: 'Invalid program id' });
    }

    const errors = workoutValidator(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors });
    }

    const minutes = Number(duration);

    try {

        const program = await Program.findOne({ user: req.userId, _id: programId });

        if (!program) return res.status(404).json({ error: 'Unable to create workout because the parent program was not found.' });

        const lastWorkout = await Workout.findOne({ user: req.userId, program: programId }).sort({ order: -1 });

        const workout = await Workout.create({
            user: req.userId,
            program: programId,
            name: name.trim(),
            order: lastWorkout ? lastWorkout.order + 1 : 1,
            duration: minutes
        })

        return res.status(201).json({ workout });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error' });
    }
};

// UserId: 69f9dba8a07e4345c0432e94
// ProgramId: 69f9dc58a07e4345c0432e95