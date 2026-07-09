import { useState } from "react";

import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

import Sidebar from "./sidebar/Sidebar.jsx";

const MainLayout = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return (

        <div
            className={`
            grid min-h-screen lg:gap-3xl pt-3xl lg:pt-0
            ${isSidebarOpen
                    ? "lg:grid-cols-[320px_1fr]"
                    : "lg:grid-cols-[95px_1fr]"
                }
            `}
        >

            <Sidebar
                isOpen={isSidebarOpen}
                onToggle={() => setIsSidebarOpen(prev => !prev)}
            />

            <div className="flex flex-col gap-md pr-lg lg:pr-3xl">
                <Header />

                <main className="flex-1 pl-xl lg:pl-0">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
