import Header from "../Components/Header";
import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
    const { user } = useAuth()
    return (
        <div>
            <h1 className="text-[3rem] ml-7">Welcome back, {user.userName}</h1>
        </div>
    )
}

export default Dashboard;