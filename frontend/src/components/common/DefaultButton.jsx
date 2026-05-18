const DefaultButton = ({ children, type = "button", className = "", onClick, disabled = false }) => {
    return (
        <button
            type={type}
            className={`text-white bg-black  py-4 px-5 text-[18px] cursor-pointer transition-transform duration-200 ease-in-out flex items-center justify-center ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default DefaultButton