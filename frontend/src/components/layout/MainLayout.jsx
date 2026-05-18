import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="p-11">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout