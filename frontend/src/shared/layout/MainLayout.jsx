import { Outlet } from "react-router-dom";
import Header from "./Header.jsx";

import Sidebar from "./sidebar/Sidebar.jsx";

const MainLayout = () => {
    return (
        <div className="grid grid-cols-[320px_1fr] min-h-screen gap-3xl">

            <Sidebar />

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
