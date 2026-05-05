const workoutValidator = ({ name, duration }, isUpdate = false) => {
    const errors = {};

    if (!isUpdate || name !== undefined) {
        const trimmedName = typeof name === "string" ? name.trim() : '';

        if (trimmedName.length < 3 || trimmedName.length > 25) errors.name = 'Workout name must be between 3 and 25 characters.';
    };

    if (!isUpdate || duration !== undefined) {
        const minutes = Number(duration);

        if (isNaN(minutes)) errors.duration = 'Please enter a valid duration in minutes.';

        else if (!Number.isInteger(minutes)) errors.duration = 'Duration must be a whole number of minutes.';

        else if (minutes < 5 || minutes > 300) errors.duration = 'Duration must be between 5 and 300 minutes.'

    }

    return errors
}

export default workoutValidator;