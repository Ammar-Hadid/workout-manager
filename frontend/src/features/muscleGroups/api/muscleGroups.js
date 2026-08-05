import { throwApiError } from "../../../shared/utils/errorHelper.js";
import { API_ENDPOINTS } from "../../../config/apiEndpoints.js";

export const getAllMuscleGroups = async () => {
    const res = await fetch(API_ENDPOINTS.muscleGroups);

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.muscleGroups;
}
