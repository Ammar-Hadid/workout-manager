import { useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

import Sidebar from "./sidebar/Sidebar.jsx";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    return (

        <div
            className={`
            grid min-h-screen lg:gap-3xl
            ${isSidebarOpen
                    ? "lg:grid-cols-[280px_1fr]"
                    : "lg:grid-cols-[95px_1fr]"
                }
            `}
        >

            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(prev => !prev)}
            />

            <div className="flex flex-col gap-2xl pr-3xl">
                <Header />

                <main className="flex-1">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
