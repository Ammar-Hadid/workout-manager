import { throwApiError } from "../util/errorHelper.js";

const API_URL = `${import.meta.env.VITE_API_URL}/programs`

export const getAllPrograms = async () => {
    const res = await fetch(API_URL, { credentials: "include" });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.programs
}

export const getOneProgram = async (id) => {
    const res = await fetch(API_URL + '/' + id, { credentials: "include", });

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data);
    }

    return data.program
}

export const createProgram = async (formData) => {
    const res = await fetch(API_URL, {
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
    const res = await fetch(API_URL + '/' + id, {
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
    const res = await fetch(API_URL + '/' + id, {
        method: "DELETE",
        credentials: "include",
    })

    const data = await res.json();

    if (!res.ok) {
        throwApiError(data)
    }

    return data.program
}