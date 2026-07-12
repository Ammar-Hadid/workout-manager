import { useLoaderData } from "react-router-dom";

import ActiveProgramContainer from "../components/ActiveProgram.component.jsx";

import { createWorkoutSession } from "../../sessions/workoutSession/api/workoutSession.api.js";

import { useNavigate } from "react-router-dom";
import { useToast } from "../../../shared/context/toastContext";
import { getErrorMessage } from "../../../shared/utils/errorHelper.js";

const Dashboard = () => {
    const { activeProgram, workoutsThisWeek } = useLoaderData();
    const navigate = useNavigate();
    const { showToast } = useToast();

    const handleStartWorkoutSession = async () => {
        try {
            const targetWorkout = workoutsThisWeek?.notCompletedWorkoutsThisWeek?.[0];

            const workoutSession = await createWorkoutSession(targetWorkout?._id);

            navigate(`/workout-sessions/${workoutSession?.workoutSession?._id}`);
        }

        catch (error) {
            showToast(getErrorMessage(error));
        }
    }

    return (
        <div className="flex flex-col gap-xl">
            <ActiveProgramContainer activeProgram={activeProgram} />

            <button onClick={handleStartWorkoutSession} className="p-lg bg-bg-accent-surface border border-primary">START WORKOUT</button>
        </div>
    )
}

export default Dashboard;
