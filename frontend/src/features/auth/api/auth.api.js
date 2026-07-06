import { getApiUrl } from "../../../config/api";
import { getErrorMessage } from "../../../shared/utils/errorHelper";

export const getCurrentUser = async () => {
    const AUTH_ME_API = getApiUrl('auth/me');

    const res = await fetch(AUTH_ME_API, { credentials: "include" });

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
    const LOGIN_API_URL = getApiUrl('auth/login');

    const res = await fetch(LOGIN_API_URL, {
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
    const REGISTER_API_URL = getApiUrl('auth/register');

    const res = await fetch(REGISTER_API_URL, {
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

