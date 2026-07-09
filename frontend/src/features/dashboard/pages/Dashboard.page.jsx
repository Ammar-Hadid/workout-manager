import { useLoaderData } from "react-router-dom";

import ActiveProgramContainer from "../components/ActiveProgram.component";

const Dashboard = () => {
    const { activeProgram, workoutsThisWeek } = useLoaderData();

    return (
        <div className="">
            <ActiveProgramContainer activeProgram={activeProgram} />
        </div>
    )
}

export default Dashboard;
