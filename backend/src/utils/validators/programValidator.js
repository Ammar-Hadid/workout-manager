const validateProgram = ({ name, split, trainingDaysPerWeek }, isUpdate = false) => {
    const errors = {};

    if (!isUpdate || name !== undefined) {
        if (!name || name.trim().length < 3) {
            errors.name = 'Program names must be at least 3 characters long.';
        }
    }

    if (!isUpdate || split !== undefined) {
        const validSplits = ['full-body', 'ppl', 'upper-lower', 'custom'];

        if (!split) errors.split = 'Please select a split to structure your workouts.';

        else if (!validSplits.includes(split)) errors.split = 'Please select a valid split.';
    }

    if (!isUpdate || trainingDaysPerWeek !== undefined) {
        const days = Number(trainingDaysPerWeek);

        if (isNaN(days)) errors.trainingDaysPerWeek = 'Please enter a number for training days per week.'

        else if (!Number.isInteger(days)) errors.trainingDaysPerWeek = 'Please enter a whole number for training days per week.'

        else if (days < 1 || days > 7) errors.trainingDaysPerWeek = `You entered [${trainingDaysPerWeek}]. Please pick a number of days between 1 and 7.`
    }

    return errors
}

export default validateProgram