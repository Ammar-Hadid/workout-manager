import { openConfirmationModal } from '../../ui/components/openConfirmationModal.js';
import { renderExercises } from '../../pages/exercisesPage.js';
import { displayTopError } from '../../ui/components/displayTopError.js';

// Edit/add exercise modal 
import { openExerciseEditor,  getNewExerciseData} from '../../ui/components/exerciseEditor.js';

import { getExerciseById, getWorkoutById } from '../../utils/finders.js';
import { loadPrograms, savePrograms } from '../../storage/storage.js';

// UUID
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';


let newExerciseData = {};

document.addEventListener('click', e => {
    const removeExerciseBtn = e.target.closest('.remove-exercise');
    const editExerciseBtn = e.target.closest('.edit-exercise');
    const addExerciseBtn = e.target.closest('.add-exercise');

    if (editExerciseBtn) {
        const exerciseCard = editExerciseBtn.closest('.icon-card');
        const exerciseId = exerciseCard.dataset.exerciseId;
        openExerciseEditor({
            id: exerciseId,
            type: 'edit',
            onClick: () => {
                newExerciseData = getNewExerciseData()
                editExercise(exerciseId)
            }
        })
    }

    else if (removeExerciseBtn) {
        const exerciseCard = removeExerciseBtn.closest('.icon-card');
        const exerciseId = exerciseCard.dataset.exerciseId;

        openConfirmationModal({
            title: 'exercise',
            description: 'This action will permanently delete the exercise. You will not be able to restore it.',
            onclick: () => handleExerciseRemoval(exerciseId)
        })
    }
    
    else if (addExerciseBtn) {
        openExerciseEditor({
            id: '',
            type: 'create',
            onClick: () => { 
                newExerciseData = getNewExerciseData();
                renderProgramsWithExerciseAddition(getWorkoutId())
            }
        })
    }

})

function getWorkoutId() { 
    const params = new URLSearchParams(window.location.search)
    
    return params.has('id') ? params.get('id') : null
}


function getWorkoutByExerciseId(id) {
    const programs = JSON.parse(localStorage.getItem('programs'))


    for (const program of programs) {
        for (const workout of program.workouts) {
            const foundWorkout = workout.exercises.some(exercise => exercise.id === id);

            if (foundWorkout) {
                return workout;
            }
        }
    }

}

/////////////////////////
/// EXERCISE ADDITION ///
/////////////////////////

function updateExercisesWithNewExercise(exerciseArr) { 

    if (!newExerciseData) { 
        console.warn('Error: new exercise data was not found')
        return exerciseArr
    }

    const newExercise = 
                        {
                            id: uuidv4(),
                            ...newExerciseData
                        }

    return [
        newExercise,
        ...exerciseArr
    ]

} 

function updateWorkoutWithExerciseAddition(workoutObj, id) { 

    if (workoutObj.id !== id) {
        return workoutObj
    } else {
        return {
            ...workoutObj,
            exercises: updateExercisesWithNewExercise(workoutObj.exercises)
        }
    }
}

function UpdateWorkoutsArrWithNewWorkout(workoutArr, id) {
    return workoutArr.map(workout => { 
        return updateWorkoutWithExerciseAddition(workout, id);
    })
}

function updateProgramWithNewWorkouts(programObj, id) { 
    return {
        ...programObj,
        workouts: UpdateWorkoutsArrWithNewWorkout(programObj.workouts, id)
    }
}

function updateProgramsArrWithNewProgram(programsArr, id) { 
    return programsArr.map(program => updateProgramWithNewWorkouts(program, id))
}

function renderProgramsWithExerciseAddition(id) { 
    const programs = loadPrograms();
    const updatedPrograms = updateProgramsArrWithNewProgram(programs, id)

    if (!updatedPrograms) return;

    savePrograms(updatedPrograms)
    renderExercises();
}

////////////////////////
/// EXERCISE EDITING ///
////////////////////////

// Update the program Array with the new adjusted exercise and saves to localStorge and renders UI accordingly
function editExercise(id) {
    const selectedExercise = getExerciseById(id);

    if (!selectedExercise) {
        console.error('ERROR: Exercise not found')
    }
    const programs = loadPrograms();

    selectedExercise.name = newExerciseData.name;
    selectedExercise.sets = newExerciseData.sets;
    selectedExercise.minReps = newExerciseData.minReps;
    selectedExercise.maxReps = newExerciseData.maxReps;
    selectedExercise.targetMuscle = newExerciseData.targetMuscle;

    localStorage.setItem('programs', JSON.stringify(programs));
    renderExercises();
}


////////////////////////
/// EXERCISE REMOVAL ///
////////////////////////

function handleExerciseRemoval(id) {
    const parentWorkout = getWorkoutByExerciseId(id);

    if (!parentWorkout) {
        console.error(`invariant violation: workout not found for exercise ${id}`);
        return
    }

    const isLastWorkout = parentWorkout.exercises.length < 2
    if (isLastWorkout) {
        displayTopError('At least one exercise is required.')
        return
    }

    removeExercise(id)
}

// filters an exercise element from the exercises array
function filterExercise(exercisesArray, exerciseId) {
    return exercisesArray.filter(exercise => exercise.id !== exerciseId)
}

// Updates the exercises in a single workout using filterExercise()
function updateWorkout(workoutObject, exerciseId) {

    return {
        ...workoutObject,
        exercises: filterExercise(workoutObject.exercises, exerciseId)
    }

}

// Updates the entire workoutsArray with the modified workout object we get from updateWorkout();
function updateWorkouts(workoutsArray, exerciseId) {
    return workoutsArray.map(workout => {
        return updateWorkout(workout, exerciseId)
    })
}

// Updates the workouts array in a single program using updateWorkouts()
function updateProgram(programObject, exerciseId) {
        return {
            ...programObject, 
            workouts: updateWorkouts(programObject.workouts, exerciseId)
        }
}


// Updates the programs array with the modified program object we get from updateProgram();
function updatePrograms(programsArray, exerciseId) {
    return programsArray.map(program => updateProgram(program, exerciseId))
}


// Updates localStorage with the new program and renders the ui accordingly
function removeExercise(id) {
    const userPrograms = JSON.parse(localStorage.getItem('programs'))

    localStorage.setItem('programs', JSON.stringify(updatePrograms(userPrograms, id)));
    renderExercises()
}
