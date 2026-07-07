import mongoose from "mongoose";

import Program from "../programs/Program.model.js";
import Workout from "../workouts/Workout.model.js";

import WorkoutSession from "../sessions/workoutSessions/WorkoutSession.model.js";

import { getCurrentWeekRange } from "../../utils/date/getCurrentWeekRange.js";

export const getWorkoutsThisWeek = async (req, res) => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();

    try {
        const program = await Program.findOne({ user: req.userId, isActive: true });

        if (!program) return res.status(404).json({ error: 'Program not found.' });

        const workouts = await Workout.find({
            user: req.userId,
            program: program._id,
        }).sort({ order: 1 });

        const completedWorkoutIds = (await WorkoutSession.distinct(
            "workout",
            {
                user: req.userId,
                program: programId,
                status: "completed",
                completedAt: {
                    $gte: startOfWeek,
                    $lte: endOfWeek
                }
            })).map(id => id.toString());


        const completedWorkoutsThisWeek = workouts.filter(workout => {
            return completedWorkoutIds.includes(workout._id.toString());
        })

        const notCompletedWorkoutsThisWeek = workouts.filter(workout => {
            return !completedWorkoutIds.includes(workout._id.toString())
        });

        return res.status(200).json({ completedWorkoutsThisWeek, notCompletedWorkoutsThisWeek });

    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }

}