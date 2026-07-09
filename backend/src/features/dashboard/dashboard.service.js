import Program from "../programs/Program.model.js";
import Workout from "../workouts/Workout.model.js";

import WorkoutSession from "../sessions/workoutSessions/WorkoutSession.model.js";
import { getCurrentWeekRange } from "../../utils/date/getCurrentWeekRange.js";

const getWorkoutsThisWeek = async (user, programId) => {
    const { startOfWeek, endOfWeek } = getCurrentWeekRange();

    const [workouts, completedWorkoutIds] = await Promise.all([
        Workout.find({
            user,
            program: programId,
        }).sort({ order: 1 }),

        WorkoutSession.distinct("workout",
            {
                user,
                program: programId,
                status: "completed",
                completedAt: {
                    $gte: startOfWeek,
                    $lte: endOfWeek
                }
            })
    ]);

    const completedIds = new Set(
        completedWorkoutIds.map(id => id.toString())
    )


    const completedWorkoutsThisWeek = workouts.filter(workout => {
        return completedIds.has(workout._id.toString());
    })

    const notCompletedWorkoutsThisWeek = workouts.filter(workout => {
        return !completedIds.has(workout._id.toString())
    });

    return { completedWorkoutsThisWeek, notCompletedWorkoutsThisWeek };
}

const getActiveProgram = async (user) => {

    const activeProgram = await Program.findOne({
        user,
        isActive: true,
    });

    if (!activeProgram) return null;

    return activeProgram
}


export const buildDashboard = async (user) => {

    const activeProgram = await getActiveProgram(user);
    const workoutsThisWeek = await getWorkoutsThisWeek(user, activeProgram?._id);

    return {
        activeProgram,
        workoutsThisWeek
    }
}