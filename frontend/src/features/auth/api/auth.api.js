import { getApiUrl } from "../../../config/api";
import { getErrorMessage } from "../../../shared/utils/errorHelper";

const AUTH_ME_API = getApiUrl('auth/me');
const LOGIN_API_URL = getApiUrl('auth/login');
const REGISTER_API_URL = getApiUrl('auth/register');
const LOGOUT_API_URL = getApiUrl('auth/logout');

export const getCurrentUser = async () => {
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

export const logout = async () => {
    const res = await fetch(LOGOUT_API_URL, {
        method: "POST",
        credentials: "include",
    });

    if (!res.ok) {
        throw new Error(getErrorMessage(await res.json()));
    }
}