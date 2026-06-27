import { useAuth } from "../../auth/context/AuthContext.jsx";

const Dashboard = () => {
    const { user } = useAuth();

    return (
        <div className="rounded-card bg-bg-surface p-xl md:p-2xl">
            <p className="mb-sm text-body-sm uppercase tracking-widest text-primary">Dashboard</p>
            <h1 className="text-h2 font-semibold leading-tight text-text-primary">Welcome back, {user.userName}</h1>
        </div>
    )
}

export default Dashboard;
