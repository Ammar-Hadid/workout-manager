import { useState, useEffect, createContext, useContext } from "react"

const AuthContext = createContext();

const API_URL = `${import.meta.env.VITE_API_URL}/muscle-groups/auth/me`

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch(API_URL, { credentials: "include" });

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