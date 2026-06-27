import ExerciseSession from "./ExerciseSession.model.js"

export const createExerciseSessionsFromExercises = async ({ exercises, session, user, workoutSession }) => {
    const exerciseSessions = exercises.map(exercise => {
        return {
            user,
            workoutSession,
            exercise: exercise._id,
            exerciseNameSnapshot: exercise.name,
            exerciseMuscleGroupSnapshot: exercise.muscleGroup,
            exerciseOrderSnapshot: exercise.order,
            restTimeSnapshot: exercise.restTime,
            setsSnapshot: exercise.sets,
            minRepsSnapshot: exercise.minReps,
            maxRepsSnapshot: exercise.maxReps,
        }
    })

    const createdExerciseSessions = await ExerciseSession.insertMany(exerciseSessions, { session });

    return createdExerciseSessions
}
