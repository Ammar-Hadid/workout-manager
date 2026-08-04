import { throwApiError } from "../../../shared/utils/errorHelper.js";
import { API_ENDPOINTS } from "../../../config/apiEndpoints.js";

const exercisesUrl = (programId, workoutId) =>
    `${API_ENDPOINTS.programs}/${encodeURIComponent(programId)}/workouts/${encodeURIComponent(workoutId)}/exercises`;

const exerciseUrl = (programId, workoutId, exerciseId) =>
    `${exercisesUrl(programId, workoutId)}/${encodeURIComponent(exerciseId)}`;

export const getAllExercises = async (programId, workoutId) => {
    const res = await fetch(exercisesUrl(programId, workoutId), { credentials: "include" });

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.exercises;
};

export const createExercise = async (programId, workoutId, formData) => {
    const res = await fetch(exercisesUrl(programId, workoutId), {
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
    const res = await fetch(exerciseUrl(programId, workoutId, exerciseId), {
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
    const res = await fetch(exerciseUrl(programId, workoutId, exerciseId), {
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
