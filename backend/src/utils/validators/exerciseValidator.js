import { MUSCLE_GROUP_IDS } from "../../constants/muscleGroups";

const exerciseValidator = ({ name, muscleGroup, restTime, sets, minReps, maxReps }, isUpdate = false) => {
    const errors = {};

    if (!isUpdate || name !== undefined) {
        const trimmedName = typeof name === "string" ? name.trim() : '';

        if (trimmedName.length < 3 || trimmedName.length > 25) {
            errors.name = 'Exercise name must be between 3 and 25 characters.';
        }
    };

    if (!isUpdate || muscleGroup !== undefined) {
        if (!MUSCLE_GROUP_IDS.includes(muscleGroup)) {
            errors.muscleGroup = 'Please select a valid muscle group.';
        };
    };

    if (!isUpdate || restTime !== undefined) {
        const restTimeNumber = Number(restTime);

        if (isNaN(restTimeNumber)) {
            errors.restTime = 'Please enter a valid rest time in seconds.';
        }

        else if (!Number.isInteger(restTimeNumber)) {
            errors.restTime = 'Rest time must be a whole number of seconds.'
        }

        else if (restTimeNumber < 10 || restTimeNumber > 600) {
            errors.restTime = 'Rest time must be between 10 and 600 seconds.';
        }

    };

    if (!isUpdate || sets !== undefined) {
        const setsNumber = Number(sets);

        if (isNaN(setsNumber)) {
            errors.sets = 'Please enter a valid number of sets.';
        }

        else if (!Number.isInteger(setsNumber)) {
            errors.sets = 'Sets must be a whole number.';
        }

        else if (setsNumber < 1 || setsNumber > 20) {
            errors.sets = 'Sets must be between 1 and 20.';
        }
    }


    const minRepsNumber = minReps !== undefined ? Number(minReps) : undefined;
    const maxRepsNumber = maxReps !== undefined ? Number(maxReps) : undefined;

    if (!isUpdate || minReps !== undefined) {

        if (isNaN(minRepsNumber)) {
            errors.minReps = 'Please enter a valid number for min reps.';
        }

        else if (!Number.isInteger(minRepsNumber)) {
            errors.minReps = 'Min reps must be a whole number.'
        }

        else if (minRepsNumber < 1 || minRepsNumber > 50) {
            errors.minReps = 'Min reps must be between 1 and 50.';
        }

        if (!isNaN(maxRepsNumber)) {
            if (minRepsNumber > maxRepsNumber) {
                errors.minReps = 'Min reps cannot be greater than max reps.'
            }
        }
    }

    if (!isUpdate || maxReps !== undefined) {

        if (isNaN(maxRepsNumber)) {
            errors.maxReps = 'Please enter a valid number for max reps.';
        }

        else if (!Number.isInteger(maxRepsNumber)) {
            errors.maxReps = 'Max reps must be a whole number.';
        }

        else if (maxRepsNumber < 1 || maxRepsNumber > 50) {
            errors.maxReps = 'Max reps must be between 1 and 50.';
        }

        if (!isNaN(minRepsNumber)) {
            if (maxRepsNumber < minRepsNumber) {
                errors.maxReps = 'Max reps cannot be less than min reps.';
            }
        }
    }

    return errors
}

export default exerciseValidator
