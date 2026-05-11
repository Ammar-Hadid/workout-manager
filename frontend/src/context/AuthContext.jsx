import { useState, useEffect, createContext, useContext } from "react"

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthLoading, setIsAuthLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const res = await fetch('http://localhost:4000/api/auth/me', { credentials: "include" });

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

export const useAuth = () => {
    const context = useContext(AuthContext);

    if (!context) throw new Error('useAuth must be used inside AuthProvider');

    return context
}