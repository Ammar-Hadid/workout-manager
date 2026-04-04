import { getMuscleById } from '../utils/finders.js';
import { pickRandomIndex } from '../utils/randomPicker.js'
import { loadPrograms } from '../storage/storage.js';


function getProgramId() {
    const param = new URLSearchParams(window.location.search);
    return param.get('id')
}

function getSelectedProgram() {
    const programId = getProgramId();
    const programs = loadPrograms();

    const targetProgram = programs.find(program => program.id === programId)
    return targetProgram
}

function getHtmlString() {

    let html = '';
    const selectedProgram = getSelectedProgram();

        for (const workout of selectedProgram.workouts) {
            const targetMusclesId = [... new Set(workout.exercises.map(e => e.targetMuscle))]

            const targetMuscleNames = targetMusclesId.map(m => getMuscleById(m).name)

            const bannersArray = targetMusclesId.map(m => getMuscleById(m).banner)
            const targetBanner = bannersArray[pickRandomIndex(bannersArray)]

            html += `
                    <a href="./exercises.html?id=${workout.id}" class="card-link">
                        <div class="program-card banner-card" style="background-image: url(${targetBanner})">
                            <h2>${workout.name}</h2>

                            <div class="card-menu-wrapper">
                                <i class="fa-solid fa-ellipsis-vertical menu-trigger"></i>

                                <div class="card-menu-dropdown light">

                                    <button class="card-menu-item">
                                        <i class="fa-solid fa-pencil"></i>
                                        <span>Edit</span>
                                    </button>

                                    <div class="menu-divider"></div>

                                    <button class="card-menu-item danger">
                                        <i class="fa-solid fa-trash danger"></i>
                                        <span>Remove</span>
                                    </button>

                                </div>
                            </div>

                            <ul>
                                <li>${targetMuscleNames.join(', ')}</li>
                                <li>${targetMuscleNames.length} Muscle Groups</li>
                                <li>${workout.durationInHours}h ${workout.durationInMinutes}m</li>
                            </ul>
                        </div>
                    </a>
            `
        }

    return html
}

function render() {

    const heading = `${getSelectedProgram().name} <span class="blue-span">workouts</span>`

    // Rendering heading
    document.getElementById('workout-heading')
    .innerHTML = heading

    // Rendering workouts
    document.getElementById('workouts-container')
    .innerHTML = getHtmlString()
}

render()

