import { getDefaultPrograms } from '../data/programs.js'

// Uncomment to reset program to defaults
// localStorage.clear()
export function loadPrograms() {
    const savedPrograms = localStorage.getItem('programs');
    if (savedPrograms) {
        console.log('Loading programs from local storage....');
        return JSON.parse(savedPrograms);
    } else {
        console.log('No programs found, saving new programs to local storage');

        const defaultPrograms = getDefaultPrograms()

        localStorage.setItem('programs', JSON.stringify(defaultPrograms));
        return defaultPrograms
    }
}


export function savePrograms(programs) {
    localStorage.setItem('programs', JSON.stringify(programs))
}
