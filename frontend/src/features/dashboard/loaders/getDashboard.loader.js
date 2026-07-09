import { getDashboard } from "../api/getDashboard.api";

export const dashboardLoader = async () => {
    const dashboard = await getDashboard();

    return dashboard;
}