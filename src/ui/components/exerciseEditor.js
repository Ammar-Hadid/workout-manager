import { getExerciseById } from "../../utils/finders.js";

// Exercise editor dialog (containing everything)
const dialogEl = document.querySelector('.exercise-editor');

// Dialog content
const dialogContent = dialogEl.querySelector('.editor-content')


// Dialog title
const titleEl = dialogEl.querySelector('.editor-title');

// Exercise name input
const exerciseNameInput = dialogEl.querySelector('#exercise-name');

// Select muscle group
const muscleGroupSelection = document.querySelector('.muscle-group-select');
const dropdown = muscleGroupSelection.querySelector('.muscle-group-dropdown')
const trigger = muscleGroupSelection.querySelector('.muscle-group-trigger');
const value = muscleGroupSelection.querySelector('.muscle-group-value');
const options = muscleGroupSelection.querySelectorAll('.muscle-group-option');

console.log(trigger)

// Sets amount input
const setsInput = dialogEl.querySelector('#sets');

// Min reps amount input
const minRepsInput = dialogEl.querySelector('#min-reps');

// Max reps amount input
const maxRepsInput = dialogEl.querySelector('#max-reps');

// Error messages
const firstBlockErrorMessage = dialogEl.querySelector('.exercise-name-error-message');
const secondBlockErrorMessage = dialogEl.querySelector('.second-block-error-message')

let newTargetMuscle = null;
let onClickAction = null;

    // Opening muscle group selection
    if (trigger) {
    trigger.addEventListener('click', () => {
        dropdown.classList.toggle('open');
    })
    }

    // Closing dropdown when option is selected & updating tiggerValue to the selected option
    if(options) {
    options.forEach(option => {
        option.addEventListener('click', () => {

            // Removes the class 'selected' from every single option
            removeClass({nodeList: options, className: 'selected'})

            // Adds the class 'selected' to the option that was clicked
            option.classList.add('selected');

            // Updates the value of the trigger to the value dataset stored in the clicked option
            // (It still dispays the id of the mucle instead of the muscule name.. That needs to be fixed in V2)
            newTargetMuscle = option.dataset.value
            value.textContent = newTargetMuscle;

            // Closes the dropdown the moment an option is clicked
            dropdown.classList.remove('open');
        })
    })
    }


export function openExerciseEditor({id, type, onClick}) {

    if (!dialogEl) return;

    // Removes the 'selected' class from all the options
    if (options) {
        removeClass({nodeList: options, className: 'selected'})
    }

    clearEditorErrors();

    newTargetMuscle = null;

    if (type === 'edit') {
        showEditModal(id)
    } 
    
    else if (type === 'create') {
        showCreateModal()
    }

    onClickAction = onClick;
}

function showEditModal(id) {
    titleEl.innerHTML = `Edit <span class="blue-span">Exercise</span>`
        const exerciseData = getExerciseData(id);

        if (!exerciseData) {
            console.error(`Unable to extract exercise data: Exercise(${id}) not found`);
            return;
        }
        
        // Filling the data in of the selected exercise
        exerciseNameInput.value = exerciseData.name;
        setsInput.value = exerciseData.sets;
        minRepsInput.value = exerciseData.minReps;
        maxRepsInput.value = exerciseData.maxReps;

        value.textContent = exerciseData.targetMuscle;

        // Loops through the options array to find the option with a value matching the exerciseData.value;
        const selectedOption = Array.from(options).find(option => option.dataset.value === exerciseData.targetMuscle)

        if (!newTargetMuscle) {
            newTargetMuscle = exerciseData.targetMuscle;
        }
        
        // If it finds it it adds the class 'selected' to it.
        if (selectedOption) selectedOption.classList.add('selected')
        
        // Opening modal
        dialogEl.showModal();
}

function showCreateModal() {
    clearFields();

    titleEl.innerHTML = `Create <span class="blue-span">Exercise</span>`


    dialogEl.showModal();
}

function clearFields() {

    const fields = [exerciseNameInput, setsInput, minRepsInput, maxRepsInput];
    fields.forEach(field => { 
        field.value === '';
    })
    
    // Finds the default option
    const selectMuscleOption = Array.from(options).find(option => option.dataset.value = 'select');

    // Adds the class selected to it for visual feedback
    selectMuscleOption.classList.add('selected');

    // Sets the value of the input to select
    value.textContent = selectMuscleOption.dataset.value;
}

function removeClass({nodeList, className}) {
    nodeList.forEach(element => element.classList.remove(className));
}


function getExerciseData(id) {
    const exercise = getExerciseById(id);
    return {
        name: exercise.name,
        sets: exercise.sets,
        minReps: exercise.minReps,
        maxReps: exercise.maxReps,
        targetMuscle: exercise.targetMuscle
    }
}

export function getNewExerciseData() {
    return {
        name: exerciseNameInput.value,
        sets: setsInput.value,
        minReps: minRepsInput.value,
        maxReps: maxRepsInput.value,
        targetMuscle: newTargetMuscle
    }
}

export function validateInput() {
    const inputFields = dialogEl.querySelectorAll('input')    
    
    clearEditorErrors()

    let hasError = false;

    inputFields.forEach(input => {
        if (input.value.trim() === '') {
            input.classList.add('error-border');
            hasError = true;
    }})

    if (exerciseNameInput.value.trim() === '') {
        firstBlockErrorMessage.textContent = 'Exercise name is required';
        firstBlockErrorMessage.classList.remove('hidden')
    } 

    if (setsInput.value.trim() === ''|| minRepsInput.value.trim() === '' || maxRepsInput.value.trim() === '') {
        secondBlockErrorMessage.textContent = 'Sets and rep ranges are required'
        secondBlockErrorMessage.classList.remove('hidden');
    }

    // Target muscle selection validation
    if (value.textContent === 'select') { 
        firstBlockErrorMessage.textContent = 'Target muscle is required';
        firstBlockErrorMessage.classList.remove('hidden');
        trigger.classList.add('error-border')
        hasError = true;
    }

    // Numbers validation
    const minRepsValue = Number(minRepsInput.value.trim());
    const maxRepsValue = Number(maxRepsInput.value.trim());

    if (minRepsValue > maxRepsValue) {
        minRepsInput.classList.add('error-border');
        maxRepsInput.classList.add('error-border');
        secondBlockErrorMessage.textContent = 'Min. reps cannot be higher than max. reps';
        secondBlockErrorMessage.classList.remove('hidden');
        hasError = true;
    }

    const setsRepsInput = [minRepsInput, maxRepsInput, sets]

    setsRepsInput.forEach(input => {
        if (Number(input.value.trim()) <= 0 || Number(input.value.trim()) >= 30) {
            input.classList.add('error-border');
            secondBlockErrorMessage.textContent = 'Values must be between 1 and 30';
            secondBlockErrorMessage.classList.remove('hidden');
            hasError = true;
        }   
    })

    return !hasError;
    
}

function clearEditorErrors() {
    const inputFields = dialogEl.querySelectorAll('input')    
    
    inputFields ? inputFields.forEach(input => input.classList.remove('error-border')) : console.warn('One or more input elements not found');
    firstBlockErrorMessage.classList.add('hidden');
    secondBlockErrorMessage.classList.add('hidden');
}

document.addEventListener('click', e => {

    // Closes dialog if it detects a click from the outsides
    if (!dialogContent.contains(e.target)) {
        dialogEl.close();
    }

    // Closes the musclegroup selection if user clicks outside the dropdown
    if (!muscleGroupSelection.contains(e.target)) {
        dropdown.classList.remove('open');
    }

    if (e.target.classList.contains('save-exercise-button')) {
        if (validateInput()) {
            onClickAction();
            dialogEl.close();
        }
    }
})
