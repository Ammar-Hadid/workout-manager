export const getFeaturedExerciseSession = (exercisesSession) => {
    if (!exercisesSession?.length) return null;

    return exercisesSession.find(({ status }) => status === 'in-progress') ?? null;
}