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


export const getWorkoutProgress = ({ exerciseSessions }) => {
    return {
        progress: calculateProgress(exerciseSessions),
        progressPercentage: calculateProgressPercentage(exerciseSessions),
    }
}