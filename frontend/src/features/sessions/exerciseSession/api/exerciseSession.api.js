import { getApiUrl } from "../../../../config/api";
import { throwApiError } from "../../../../shared/utils/errorHelper";

const EXERCISE_SESSION_API_URL = getApiUrl('exercise-sessions');

const transitionExerciseSession = async (id, action) => {

    const res = await fetch(`${EXERCISE_SESSION_API_URL}/${id}/${action}`, {
        method: "POST",
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
};

export const startExerciseSession = (id) => transitionExerciseSession(id, 'start');

export const completeExerciseSession = (id) => transitionExerciseSession(id, 'complete');

export const skipExerciseSession = (id) => transitionExerciseSession(id, 'skip');
