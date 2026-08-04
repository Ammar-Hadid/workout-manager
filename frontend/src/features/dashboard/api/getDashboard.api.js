import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { throwApiError } from "../../../shared/utils/errorHelper";

export const getDashboard = async () => {
    const res = await fetch(API_ENDPOINTS.dashboard, {
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}
