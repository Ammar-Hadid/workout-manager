import { API_ENDPOINTS } from "../../../../config/apiEndpoints";
import { throwApiError } from "../../../../shared/utils/errorHelper";

const workoutSessionUrl = (workoutSessionId) =>
    `${API_ENDPOINTS.workoutSessions}/${encodeURIComponent(workoutSessionId)}`;

const workoutSessionActionUrl = (workoutSessionId, action) =>
    `${workoutSessionUrl(workoutSessionId)}/${action}`;

export const getWorkoutSession = async (workoutSessionId) => {
    const res = await fetch(workoutSessionUrl(workoutSessionId), {
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}

export const createWorkoutSession = async (workoutId) => {
    const res = await fetch(API_ENDPOINTS.workoutSessions, {
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

export const completeWorkoutSession = async (workoutSessionId) => {
    const res = await fetch(
        workoutSessionActionUrl(workoutSessionId, "complete"),
        {
            method: "POST",
            credentials: "include",
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
};

export const pauseWorkoutSession = async (workoutSessionId) => {
    const res = await fetch(
        workoutSessionActionUrl(workoutSessionId, "pause"),
        {
            method: "POST",
            credentials: "include",
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}

export const resumeWorkoutSession = async (workoutSessionId) => {
    const res = await fetch(
        workoutSessionActionUrl(workoutSessionId, "resume"),
        {
            method: "POST",
            credentials: "include",
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}

export const discardWorkoutSession = async (workoutSessionId) => {
    const res = await fetch(
        workoutSessionActionUrl(workoutSessionId, "discard"),
        {
            method: "POST",
            credentials: "include",
        },
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}
