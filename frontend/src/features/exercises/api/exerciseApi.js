import { throwApiError } from "../../../shared/utils/errorHelper.js";
import { getApiUrl } from "../../../config/api.js";

const PROGRAMS_URL = getApiUrl("/programs");

export const getAllExercises = async (programId, workoutId) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}/exercises`, { credentials: "include" });

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.exercises;
};

export const createExercise = async (programId, workoutId, formData) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}/exercises`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include",
    })

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.exercise
};

export const editExercise = async (programId, workoutId, exerciseId, formData) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}/exercises/${exerciseId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(formData),
        credentials: "include"
    })

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.exercise
};

export const deleteExercise = async (programId, workoutId, exerciseId) => {
    const res = await fetch(`${PROGRAMS_URL}/${programId}/workouts/${workoutId}/exercises/${exerciseId}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.exercise
};
