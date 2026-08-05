import { getApiUrl } from "./api";

export const API_ENDPOINTS = Object.freeze({
    auth: getApiUrl("/auth"),
    dashboard: getApiUrl("/dashboard"),
    exerciseSessions: getApiUrl("/exercise-sessions"),
    muscleGroups: getApiUrl("/muscle-groups"),
    programs: getApiUrl("/programs"),
    workoutSessions: getApiUrl("/workout-sessions"),
});
