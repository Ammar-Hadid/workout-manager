import { throwApiError } from "../../../shared/utils/errorHelper.js";
import { API_ENDPOINTS } from "../../../config/apiEndpoints.js";

const programUrl = (programId) =>
    `${API_ENDPOINTS.programs}/${encodeURIComponent(programId)}`;

const programActionUrl = (programId, action) =>
    `${programUrl(programId)}/${action}`;

export const getAllPrograms = async () => {
    const res = await fetch(API_ENDPOINTS.programs, { credentials: "include" });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.programs
}

export const getOneProgram = async (id) => {
    const res = await fetch(programUrl(id), { credentials: "include", });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.program
}

export const createProgram = async (formData) => {
    const res = await fetch(API_ENDPOINTS.programs, {
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
    const res = await fetch(programUrl(id), {
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
    const res = await fetch(programUrl(id), {
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
    const res = await fetch(programActionUrl(id, "activate"), {
        method: "PATCH",
        credentials: "include"
    });

    const data = await res.json();

    if (!res.ok) throwApiError(data);

    return data.program;
}
