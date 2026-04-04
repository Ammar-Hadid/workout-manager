import { muscleGroups } from '../data/muscleGroups.js';
import { loadPrograms } from '../storage/storage.js';


function getWorkoutId() {
    const param = new URLSearchParams( window.location.search );

    return param.get('id')
}

function getWorkoutById() {
    const workoutId = getWorkoutId();
    const programs = loadPrograms();

    for (const program of programs) {

        for (const workout of program.workouts) {

            if (workout.id === workoutId) {

                return workout
            }
        }
    }
}



function getHtmlString() {

    const workout = getWorkoutById()

    let html = '';
    workout.exercises.forEach( ex => {

        const targetIcon = Object.values(muscleGroups)
        .find(group => group.id === ex.targetMuscle).icon;

        html += `
            <div class="icon-card" data-exercise-id="${ex.id}">
                <img src="${targetIcon}" alt="icon showing target muscle">
                <div class="exercise-details">
                    <h2>${ex.name}</h2>

                    <div class="card-menu-wrapper">
                        <i class="fa-solid fa-ellipsis-vertical menu-trigger"></i>
                
                        <div class="card-menu-dropdown dark">
                
                            <button class="card-menu-item edit-exercise">
                                <i class="fa-solid fa-pencil"></i>
                                <span>Edit</span>
                            </button>
                
                            <div class="menu-divider"></div>
                
                            <button class="card-menu-item danger remove-exercise">
                                <i class="fa-solid fa-trash danger"></i>
                                <span>Remove</span>
                            </button>
                
                        </div>
                    </div>

                    <ul>
                        <li><span>${ex.sets} × ${ex.minReps} - ${ex.maxReps}</span></li>
                    </ul>
                </div>
            </div>
        `
    })

    return html
}

export function renderExercises() {
    const html = getHtmlString();

    // Render page title
    document.getElementById('exercises-heading')
    .innerHTML = `${getWorkoutById().name} <span class="blue-span">exercises</span>`
    
    // Render exercises
    document.querySelector('.exercises-wrapper')
    .innerHTML = html

    // Render back button
    document.querySelector('.back-to-workout')
        .innerHTML = `
                    <button class="default-button add-exercise">Add new exercise</button>
                    <a href="${document.referrer}" class="default-button">Back to workouts</a>
                      `
}


renderExercises()

