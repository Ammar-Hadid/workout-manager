import { Circle } from "lucide-react";
import { useLoaderData } from "react-router-dom";

import { getFeaturedExerciseSession } from "../selectors/workoutsession.selectors.js";

import CurrentExercise from "../../exerciseSession/components/CurrentExercise.component.jsx";

import ExercisesQueue from "../components/ExercisesQueue.component.jsx";

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



            <div className="flex min-w-0 flex-col gap-lg lg:flex-row">
                <CurrentExercise featuredExercise={featuredExerciseSession} />

                <ExercisesQueue exercises={exerciseSessions} />
            </div>
        </div>
    );
}

export default WorkoutSession;
