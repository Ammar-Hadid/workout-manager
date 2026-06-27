import { useState, useEffect, createContext, useContext } from "react"
import { getApiUrl } from "../../../config/api.js";

const AuthContext = createContext();

const AUTH_ME_URL = getApiUrl("/auth/me");

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(AUTH_ME_URL, { credentials: "include" });

                const data = await res.json();

                if (!res.ok) throw new Error(data.error);

                setUser(data.user);
                setIsAuthLoading(false)
            }
            catch (error) {
                console.error(error);
                setUser(null);
            }
            finally {
                setIsAuthLoading(false);
            }
        }

        fetchUser();
    }, []);

    return (
        <AuthContext.Provider value={{ user, setUser, isAuthLoading }}>
            {children}
        </AuthContext.Provider>
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used inside AuthProvider');

    return context
}
