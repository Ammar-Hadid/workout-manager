const configuredApiUrl = import.meta.env.VITE_API_URL;

if (!configuredApiUrl) {
    throw new Error("VITE_API_URL is not configured.");
}

export const API_URL = configuredApiUrl.replace(/\/+$/, "");

export const getApiUrl = (path = "") => {
    const normalizedPath = path.startsWith("/") ? path : `/${path}`;

    return `${API_URL}${normalizedPath}`;
};
