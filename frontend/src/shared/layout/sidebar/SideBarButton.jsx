import { NavLink } from "react-router-dom"

const SideBarButton = ({ icon: Icon, label, to = '', isOpen }) => {
    return (
        <NavLink
            to={to}
            className={({ isActive }) =>
                `
                flex gap-md items-center p-md w-full
                text-body-sm text-text-primary opacity-70
                rounded-md
                transition-opacity duration-200 ease-in-out hover:opacity-100
                ${isActive ? "bg-primary opacity-100" : "bg-transparent"}
                `
            }
        >
            <Icon />
            {isOpen && <span>{label}</span>}
        </NavLink>
    )
}

export default SideBarButton;