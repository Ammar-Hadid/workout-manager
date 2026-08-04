import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { throwApiError } from "../../../../shared/utils/errorHelper";

const exerciseSessionActionUrl = (exerciseSessionId, action) =>
    `${API_ENDPOINTS.exerciseSessions}/${encodeURIComponent(exerciseSessionId)}/${action}`;

const transitionExerciseSession = async (exerciseSessionId, action) => {
    const res = await fetch(exerciseSessionActionUrl(exerciseSessionId, action), {
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
