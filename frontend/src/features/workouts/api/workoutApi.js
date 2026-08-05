import { throwApiError } from "../../../shared/utils/errorHelper.js";
import { API_ENDPOINTS } from "../../../config/apiEndpoints.js";

const workoutsUrl = (programId) =>
    `${API_ENDPOINTS.programs}/${encodeURIComponent(programId)}/workouts`;

const workoutUrl = (programId, workoutId) =>
    `${workoutsUrl(programId)}/${encodeURIComponent(workoutId)}`;

export const getAllWorkouts = async (programId) => {
    const res = await fetch(workoutsUrl(programId),
        { credentials: "include" }
    );

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.workouts
}

export const getOneWorkout = async (programId, workoutId) => {
    const res = await fetch(workoutUrl(programId, workoutId),
        { credentials: "include" }
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data)
    }

    return data.workout
}

export const createWorkout = async (programId, formData) => {
    const res = await fetch(workoutsUrl(programId), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
        credentials: "include",
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data)
    }

    return data.workout
}

export const editWorkout = async (programId, workoutId, formData) => {
    const res = await fetch(workoutUrl(programId, workoutId), {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.workout;
}

export const deleteWorkout = async (programId, workoutId) => {
    const res = await fetch(workoutUrl(programId, workoutId), {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    })

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.workout;
}
