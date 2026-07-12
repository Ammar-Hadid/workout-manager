import { Circle } from "lucide-react";
import { useLoaderData } from "react-router-dom";
import CurrentExercise from "../../exerciseSession/components/CurrentExercise.component.jsx";

import { getFeaturedExerciseSession } from "../selectors/workoutsession.selectors.js";

const WorkoutSession = () => {
    const { workoutSession, exerciseSessions } = useLoaderData();

    if (!workoutSession || !exerciseSessions) return null;

    const featuredExerciseSession = getFeaturedExerciseSession(exerciseSessions);



    return (
        <div className="flex flex-col gap-xl pb-3xl">
            <div className="flex items-center gap-sm rounded-card border border-text-secondary/10 bg-bg-surface p-lg text-primary">
                <Circle className="size-sm fill-current" aria-hidden="true" />
                <span>In Progress</span>
            </div>

            {featuredExerciseSession && (
                <div>
                    <CurrentExercise featuredExercise={featuredExerciseSession} />
                </div>
            )}
        </div>
    );
}

export default WorkoutSession;
