import { getApiUrl } from "../../../../config/api"
import { throwApiError } from "../../../../shared/utils/errorHelper";

const WORKOUT_API_URL = getApiUrl('workout-sessions');

export const getWorkoutSession = async (workoutSessionId) => {

    const WORKOUT_SESSION_API_URL = getApiUrl(`workout-sessions/${workoutSessionId}`);

    const res = await fetch(WORKOUT_SESSION_API_URL, {
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}

export const createWorkoutSession = async (workoutId) => {
    const res = await fetch(WORKOUT_API_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ workoutId })
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}