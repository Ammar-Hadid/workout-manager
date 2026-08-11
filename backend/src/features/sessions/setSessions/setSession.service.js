import SetSession from "./SetSession.model.js";

export const createSetSessionsFromExerciseSessions = async ({ user, exerciseSessions, workoutSessionId, session }) => {

    const setSessions = exerciseSessions.flatMap(exerciseSession => {
        return Array.from(
            { length: exerciseSession.setsSnapshot },

            (_, index) => (
                {
                    user,
                    workoutSession: workoutSessionId,
                    exerciseSession,
                    order: index + 1,
                }
            )
        )
    });

    const createdSetSessions = await SetSession.insertMany(setSessions, { session });

    return createdSetSessions;
}

