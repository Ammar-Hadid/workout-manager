import { getWorkoutSession } from "../api/workoutSession.api"


export const workoutSessionLoader = async ({ params }) => {
    const { workoutSessionId } = params;

    return await getWorkoutSession(workoutSessionId);
}