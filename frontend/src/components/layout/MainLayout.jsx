import { Outlet } from "react-router-dom";
import Header from "./Header";

const MainLayout = () => {
    return (
        <>
            <Header />
            <main className="px-md py-section md:px-2xl lg:px-5xl">
                <Outlet />
            </main>
        </>
    )
}

export default MainLayout
