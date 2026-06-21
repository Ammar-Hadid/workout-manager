import { throwApiError } from "../utils/errorHelper.js";
import { getApiUrl } from "../config/api.js";

const PROGRAMS_URL = getApiUrl("/programs");

export const getAllWorkouts = async (programId) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts`,
        { credentials: "include" }
    );

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.workouts
}

export const getOneWorkout = async (programId, workoutId) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}`,
        { credentials: "include" }
    );

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data)
    }

    return data.workout
}

export const createWorkout = async (programId, formData) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts`, {
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
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}`, {
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
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}`, {
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
