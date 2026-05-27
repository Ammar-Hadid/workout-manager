import { useState, createContext, useContext, useRef } from "react";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
    const [toast, setToast] = useState(null);

    const timeoutRef = useRef(null);

    const showToast = (message, variant = "danger") => {
        setToast({ message, variant });

        clearTimeout(timeoutRef.current);

        timeoutRef.current = setTimeout(() => setToast(null), 3000)
    }

    const variantsClassList = {
        success: 'bg-green-700',
        warning: 'bg-yellow-600',
        danger: 'bg-red-800',
    }

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}

            {toast &&
                (
                    <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 p">
                        <p className={`${variantsClassList[toast.variant]} text-white p-4 rounded shadow`}>{toast.message}</p>
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




