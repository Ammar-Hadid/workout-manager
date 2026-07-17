const getCompletedExerciseCount = (exerciseSessions) => {
    if (!exerciseSessions) return null;

    return exerciseSessions.filter(({ status }) => status === "completed").length;
}

const calculateProgress = (exerciseSessions) => {
    if (!exerciseSessions) return null;

    const totalExercisesCount = exerciseSessions.length;
    const completedExercisesCount = getCompletedExerciseCount(exerciseSessions);

    return {
        totalExercisesCount,
        completedExercisesCount
    }
}

const calculateProgressPercentage = (exerciseSessions) => {
    if (!exerciseSessions) return null;

    const totalExercisesCount = exerciseSessions.length;
    const completedExercisesCount = getCompletedExerciseCount(exerciseSessions);

    return Math.round(completedExercisesCount / totalExercisesCount * 100);
}


const calculateEstimatedTimeLeft = (workoutSession) => {
    if (
        !workoutSession?.workoutDurationSnapshot ||
        !workoutSession?.startedAt
    ) return null;

    const now = Date.now();

    const durationMs = workoutSession.workoutDurationSnapshot * 60_000;
    const startedAtMs = new Date(workoutSession.startedAt).getTime();

    const elapsedMs = now - startedAtMs;
    const remainingMs = Math.max(0, durationMs - elapsedMs);

    return Math.ceil(remainingMs / 60_000);
}

export const getWorkoutProgress = ({ workoutSession, exerciseSessions }) => {
    return {
        progress: calculateProgress(exerciseSessions),
        progressPercentage: calculateProgressPercentage(exerciseSessions),
        estimatedTimeLeft: calculateEstimatedTimeLeft(workoutSession),
    }
}