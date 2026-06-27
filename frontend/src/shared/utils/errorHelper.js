export const getErrorMessage = (error) => {
    if (typeof error === "string") {
        return error
    }

    else if (error instanceof Error && error.message) {
        return error.message
    }

    else if (typeof error?.error === "string") {
        return error.error
    }

    else if (typeof error?.message === "string") {
        return error.message
    }

    else if (typeof error?.errors === "string") {
        return error.errors
    }

    else if (typeof error.errors === "object") {
        const firstErrorMessage = Object.values(error.errors)[0];

        return firstErrorMessage
    }

    return 'Something went wrong.'

}

export const throwApiError = (data) => {
    throw new Error(getErrorMessage(data))
}