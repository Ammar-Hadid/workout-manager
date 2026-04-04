import { loadPrograms } from '../storage/storage.js';


function getHtmlTemplate() {
    let htmlTemplate = '';

    const programs = loadPrograms();

    for (const program of programs) {

        const isActiveClass = program.isActive ? '' : 'hidden' 

        const focusedMuscleGroups = [];
        for ( const group of program.focusedMuscleGroups) {
            focusedMuscleGroups.push(group.name)
        }

        const banner = program.focusedMuscleGroups[0].banner;


        htmlTemplate += `<a href="./workouts.html?id=${program.id}" class="card-link">
                            <div class="program-card banner-card" style="background-image: url(${banner})">
                                <p class="is-active ${isActiveClass}">Active</p>
                                <h2>${program.name}</h2>

                                <div class="card-menu-wrapper">
                                    <i class="fa-solid fa-ellipsis-vertical menu-trigger"></i>

                                    <div class="card-menu-dropdown light">

                                        <button class="card-menu-item">
                                            <i class="fa-solid fa-pencil"></i>
                                            <span>Edit</span>
                                        </button>

                                        <button class="card-menu-item">
                                            <i class="fa-solid fa-star"></i>
                                            <span>Make Active</span>
                                        </button>

                                        <div class="menu-divider"></div>

                                        <button class="card-menu-item danger">
                                            <i class="fa-solid fa-trash danger"></i>
                                            <span>Remove</span>
                                        </button>

                                    </div>
                                </div>

                                <ul>
                                    <li>${program.workouts.length} Workouts a week</li>
                                    <li>${focusedMuscleGroups.join(', ')}</li>
                                </ul>
                            </div>
                            </a>`
    }

    return htmlTemplate
}

export function renderPrograms() {
    const html = getHtmlTemplate();
    const programsContainer = document.getElementById('programs-container');
    
    programsContainer.innerHTML = html
}

renderPrograms();