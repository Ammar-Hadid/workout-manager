import { throwApiError } from "../utils/errorHelper.js";
import { getApiUrl } from "../config/api.js";

const MUSCLE_GROUPS_URL = getApiUrl("/muscle-groups");

export const getAllMuscleGroups = async () => {
    const res = await fetch(MUSCLE_GROUPS_URL);

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.muscleGroups;
}
