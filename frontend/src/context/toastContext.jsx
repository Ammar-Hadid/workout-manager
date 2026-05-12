import { useState, createContext, useContext } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const showToast = (toastMessage) => {
        setToast(toastMessage);

        setTimeout(() => setToast(null), 3000)
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast &&
                (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p">
                        <p className="bg-red-800 text-white p-4 rounded shadow">{toast}</p>
                    </div>
                )
            }
        </ToastContext.Provider>
    )
};

export const useToast = () => {
    const context = useContext(ToastContext);

    if (!context) {
        throw new Error('useToast must be used inside ToastProvider')
    }

    return context
}

