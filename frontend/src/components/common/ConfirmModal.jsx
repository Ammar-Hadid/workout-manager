const ConfirmModal = ({ options = {}, isOpen, onConfirm, onCancel }) => {
    const {
        mode = "danger",
        title = "Are you sure?",
        text = "This action cannot be undone",
        confirmText = "proceed" } = options;

    const modalClassList = `fixed inset-0 z-100 bg-black/75 flex items-center justify-center transition-opacity duration-100 ease-in-out`;
    const modalStateClassList = isOpen ? `opacity-100 pointer-events-auto` : `opacity-0 pointer-events-none`;

    const contentWrapperClassList = `max-w-[35dvw] bg-white text-black flex flex-col gap-7 p-10 gap-10`;

    const modeClasses = {
        warning: "bg-yellow-600",
        danger: "bg-red-800",
        default: "bg-black",
    };

    const confirmButtonClassList = `${modeClasses[mode] || modeClasses.default} text-white py-5 px-8 cursor-pointer flex-1 text-[18px] font-bold`;

    return (
        <div className={`${modalClassList} ${modalStateClassList}`}>
            <div className={contentWrapperClassList}>
                <div className="flex flex-col gap-3">
                    <h2 className="text-[28px] tracking-wide m-0 p-0">{title}</h2>
                    <p className="opacity-70 text-[18px] tracking-wide m-0 p-0">{text}</p>
                </div>
                <div className="flex w-full justify-between gap-4">
                    <button onClick={onCancel} className="bg-transparent border-3 border-black py-3 px-8 cursor-pointer flex-1 text-[18px]" type="button">Cancel</button>
                    <button onClick={onConfirm} className={confirmButtonClassList} type="button">{confirmText}</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmModal