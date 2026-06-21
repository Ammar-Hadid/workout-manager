import { throwApiError } from "../utils/errorHelper.js";
import { getApiUrl } from "../config/api.js";

const PROGRAMS_URL = getApiUrl("/programs");

export const getAllPrograms = async () => {
    const res = await fetch(PROGRAMS_URL, { credentials: "include" });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.programs
}

export const getOneProgram = async (id) => {
    const res = await fetch(`${PROGRAMS_URL}/${id}`, { credentials: "include", });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.program
}

export const createProgram = async (formData) => {
    const res = await fetch(PROGRAMS_URL, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.program
}

export const updateProgram = async (id, formData) => {
    const res = await fetch(`${PROGRAMS_URL}/${id}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(formData)
    })

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.program
}

export const deleteProgram = async (id) => {
    const res = await fetch(`${PROGRAMS_URL}/${id}`, {
        method: "DELETE",
        credentials: "include",
    })

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data)
    }

    return data.program
}

export const activateProgram = async (id) => {
    const res = await fetch(`${PROGRAMS_URL}/${id}/activate`, {
        method: "PATCH",
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.program;
}
