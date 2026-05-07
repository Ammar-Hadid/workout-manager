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