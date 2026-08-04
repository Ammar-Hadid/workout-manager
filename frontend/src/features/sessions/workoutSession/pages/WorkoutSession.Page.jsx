import { useLoaderData } from "react-router-dom";

import { getFeaturedExerciseSession } from "../selectors/workoutsession.selectors.js";

import CurrentExercise from "../../exerciseSession/components/CurrentExercise.component.jsx";

import ExercisesQueue from "../components/ExercisesQueue.component.jsx";

import { useExerciseSessionActions } from "../../exerciseSession/hooks/useExerciseSessionActions.hook.js";
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
        pendingAction: pendingExerciseAction,
        isPending: isExerciseActionPending,
    } = useExerciseSessionActions({ exerciseSessions });

    const {
        pauseWorkout,
        resumeWorkout,
        completeWorkout,
        discardWorkout,
        pendingAction: pendingWorkoutAction,
        isPending: isWorkoutActionPending,
    } = useWorkoutSessionActions(workoutSession?._id);

    if (!workoutSession || !exerciseSessions) return null;

    const featuredExerciseSession = getFeaturedExerciseSession(exerciseSessions);
    const areExerciseActionsDisabled =
        isExerciseActionPending ||
        isWorkoutActionPending ||
        workoutSession.status !== "in-progress";

    const { progress, progressPercentage } = getWorkoutProgress({ exerciseSessions });

    return (
        <div className="flex flex-col gap-xl pb-3xl">

            <WorkoutSessionHeader
                workoutSession={workoutSession}
                pauseWorkout={pauseWorkout}
                resumeWorkout={resumeWorkout}
                discardWorkout={discardWorkout}
                pendingAction={pendingWorkoutAction}
                isPending={isWorkoutActionPending}
            />

            <div className="flex min-w-0 flex-col gap-lg lg:items-start lg:flex-row ">
                <CurrentExercise
                    featuredExercise={featuredExerciseSession}
                    completeExercise={completeExercise}
                    skipExercise={skipExercise}
                    isPending={areExerciseActionsDisabled}
                />

                <ExercisesQueue
                    exercises={exerciseSessions}
                    startExercise={startExercise}
                    isPending={areExerciseActionsDisabled}
                    pendingAction={pendingExerciseAction}
                />
            </div>

            <WorkoutProgress
                workoutSession={workoutSession}
                progress={progress}
                progressPercentage={progressPercentage}
                completeWorkout={completeWorkout}
                isPending={isWorkoutActionPending}
            />
        </div>
    );
}

export default WorkoutSession;
