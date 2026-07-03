import { Link } from "react-router-dom";

import SideBarButton from "./SideBarButton";

import {
    House,
    CalendarDays

} from "lucide-react";


const navigationItems = [
    {
        id: 'dashboard',
        label: 'Dashboard',
        icon: House,
        to: '/',
    },

    {
        id: 'programs',
        label: 'Programs',
        icon: CalendarDays,
        to: '/programs',
    },

]

const Sidebar = () => {
    return (
        <div className={`
            flex flex-col gap-lg items-start
            p-md border-r border-text-primary/10
        `}>
            <button className="font-display text-body font-bold">
                <Link to="/">Workout Manager</Link>
            </button>

            <div className="flex flex-col gap-sm w-full">
                {navigationItems.map(item => {
                    return (
                        <SideBarButton
                            key={item.id}
                            icon={item.icon}
                            label={item.label}
                            to={item.to}
                        />
                    )
                })}
            </div>

        </div>

    )
}

export default Sidebar;