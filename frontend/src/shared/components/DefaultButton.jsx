import { Link } from "react-router-dom";

const DefaultButton = ({
    variant = "primary",
    children,
    type = "button",
    className = "",
    onClick,
    disabled = false,
    to,
}) => {
    const variantStyles = {
        primary: "bg-primary border border-primary",
        secondary: "bg-transparent border border-text-primary",
    };

    const buttonClasses = `
        ${variantStyles[variant] ?? variantStyles.primary}
        flex items-center justify-center
        rounded-md
        px-lg py-md
        text-body font-medium text-text-primary
        transition duration-200 ease-in-out
        hover:brightness-110
        focus-visible:outline-none
        focus-visible:ring-4
        focus-visible:ring-primary/30
        disabled:cursor-not-allowed
        disabled:opacity-50
        cursor-pointer
        ${className}
    `;

    if (to) {
        return (
            <Link
                to={to}
                className={buttonClasses}
            >
                {children}
            </Link>
        );
    }

    return (
        <button
            type={type}
            className={buttonClasses}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

export default DefaultButton;