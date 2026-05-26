const API_URL = `${import.meta.env.VITE_API_URL}/muscle-groups`

import { throwApiError } from "../utils/errorHelper.js";

export const getAllMuscleGroups = async () => {
    const res = await fetch(API_URL);

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.muscleGroups;
}
