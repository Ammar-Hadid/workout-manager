import { muscleGroups } from "../data/muscleGroups.js";
import { loadPrograms } from "../storage/storage.js"


export function getMuscleById(id) {
    return Object.values(muscleGroups).find(g => g.id === id)
}

export function getExerciseById(id) {
    const programs = loadPrograms();
    return programs.flatMap(program => program.workouts)
    .flatMap(workout => workout.exercises)
    .find(exercise => exercise.id === id);
}

export function getWorkoutById(id) {
    const programs = loadPrograms();
    return programs.flatMap(program => program.workouts)
    .find(workout => workout.id === id)
}