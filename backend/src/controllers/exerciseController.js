import mongoose from "mongoose";
import Exercise from "../models/Exercise.js";
import Workout from "../models/Workout.js";

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

