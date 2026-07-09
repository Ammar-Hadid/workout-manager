import { getApiUrl } from "../../../config/api";
import { throwApiError } from "../../../shared/utils/errorHelper";

const GET_DASHBOARD_API_URL = getApiUrl('dashboard')

export const getDashboard = async () => {
    const res = await fetch(GET_DASHBOARD_API_URL, {
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data;
}