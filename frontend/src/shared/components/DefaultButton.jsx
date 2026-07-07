const DefaultButton = ({ variant, children, type = "button", className = "", onClick, disabled = false }) => {
    const variantStyles = {
        primary: 'bg-primary border border-primary',
        secondary: 'bg-transparent border border-text-primary'
    }

    return (
        <button
            type={type}
            className={`${variantStyles?.[variant] ?? variantStyles.primary} flex items-center justify-center rounded-md px-lg py-md text-body font-medium text-text-primary transition duration-200 ease-in-out hover:brightness-110 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-50 cursor-pointer ${className}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}

export default DefaultButton
