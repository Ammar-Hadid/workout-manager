import { useState, useEffect, createContext, useContext } from "react"

import { getCurrentUser } from "../api/auth.api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const user = await getCurrentUser();

                setUser(user);
            }
            catch (error) {
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
