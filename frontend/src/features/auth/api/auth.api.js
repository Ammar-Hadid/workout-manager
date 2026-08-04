import { API_ENDPOINTS } from "../../../config/apiEndpoints";
import { getErrorMessage } from "../../../shared/utils/errorHelper";

const authEndpoint = (action) => `${API_ENDPOINTS.auth}/${action}`;

const AUTH_ME_URL = authEndpoint("me");
const LOGIN_URL = authEndpoint("login");
const REGISTER_URL = authEndpoint("register");
const LOGOUT_URL = authEndpoint("logout");

export const getCurrentUser = async () => {
    const res = await fetch(AUTH_ME_URL, { credentials: "include" });

    const data = await res.json();

    if (res.status === 401) {
        return null;
    }

    if (!res.ok) {
        throw new Error(getErrorMessage(data));
    }

    return data.user;
}

export const login = async (form) => {
    const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(getErrorMessage(data));
    }

    return data.user;
}

export const register = async (form) => {
    const res = await fetch(REGISTER_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
    });

    const data = await res.json();

    if (!res.ok) {
        throw new Error(getErrorMessage(data));
    }

    return data.user;
}

export const logout = async () => {
    const res = await fetch(LOGOUT_URL, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(getErrorMessage(await res.json()));
    }
}
