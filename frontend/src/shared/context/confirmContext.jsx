import { useState, createContext, useContext } from "react";
import ConfirmModal from "../components/ConfirmModal.jsx";

const ConfirmContext = createContext(null);

export const ConfirmProvider = ({ children }) => {
    const [modalOptions, setModalOptions] = useState(null);

    const confirm = (options = {}) => {
        return new Promise((resolve) => {
            setModalOptions({ ...options, resolve })
        })
    }

    const handleConfirm = () => {
        modalOptions.resolve(true);
        setModalOptions(null);
    }

    const handleCancel = () => {
        modalOptions.resolve(false);
        setModalOptions(null);
    }

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}
            <ConfirmModal
                isOpen={!!modalOptions}
                options={modalOptions ?? {}}
                onConfirm={handleConfirm}
                onCancel={handleCancel}
            />
        </ConfirmContext.Provider>
    )

}

// eslint-disable-next-line react-refresh/only-export-components
export const useConfirm = () => {
    const context = useContext(ConfirmContext);

    if (!context) throw new Error("useConfirm must be used inside ConfirmProvider");

    return context
}
