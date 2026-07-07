import { redirect } from "react-router-dom";
import { getCurrentUser } from "../api/auth.api";

export const redirectIfAuthenticated = async () => {
    const user = await getCurrentUser();

    if (user) {
        throw redirect('/');
    }

    return null;
}