import { useLoaderData } from "react-router-dom";

import { getFeaturedExerciseSession } from "../selectors/workoutsession.selectors.js";

import CurrentExercise from "../../exerciseSession/components/CurrentExercise.component.jsx";

import ExercisesQueue from "../components/ExercisesQueue.component.jsx";

import { useWorkoutSessionActions } from "../hooks/useWorkoutSessionActions.hook.js";

import WorkoutProgress from "../components/WorkoutProgress.component.jsx";
import { getWorkoutProgress } from "../selectors/workoutProgress.selector.js";

import WorkoutSessionHeader from "../components/WorkoutSessionHeader.component.jsx";

const WorkoutSession = () => {
    const { workoutSession, exerciseSessions } = useLoaderData();

    const {
        startExercise,
        completeExercise,
        skipExercise,
        pendingAction,
        isPending
    } = useWorkoutSessionActions({ exerciseSessions });

    if (!workoutSession || !exerciseSessions) return null;

    const featuredExerciseSession = getFeaturedExerciseSession(exerciseSessions);

    const { progress, progressPercentage } = getWorkoutProgress({ exerciseSessions });

    return (
        <div className="flex flex-col gap-xl pb-3xl">

            <WorkoutSessionHeader workoutSession={workoutSession} />

            <div className="flex min-w-0 flex-col gap-lg lg:items-start lg:flex-row ">
                <CurrentExercise
                    featuredExercise={featuredExerciseSession}
                    completeExercise={completeExercise}
                    skipExercise={skipExercise}
                />

                <ExercisesQueue exercises={exerciseSessions} startExercise={startExercise} isPending={isPending} />
            </div>

            <WorkoutProgress
                workoutSession={workoutSession}
                progress={progress}
                progressPercentage={progressPercentage}
            />
        </div>
    );
}

export default WorkoutSession;
