import mongoose from "mongoose";

const exerciseSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    workoutSession: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'WorkoutSession',
        required: true,
    },

    exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
    },

    exerciseNameSnapshot: {
        type: String,
        required: true,
    },

    exerciseMuscleGroupSnapshot: {
        type: String,
        required: true,
    },

    exerciseOrderSnapshot: {
        type: Number,
        required: true,
    },

    restTimeSnapshot: {
        type: Number,
        required: true,
    },

    setsSnapshot: {
        type: Number,
        required: true,
    },

    minRepsSnapshot: {
        type: Number,
        required: true,
    },

    maxRepsSnapshot: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['not-started', 'in-progress', 'skipped', 'completed'],
        default: 'not-started',
        required: true,
    },

    startedAt: {
        type: Date,
    },

    completedAt: {
        type: Date,
        default: null,
    },

    skippedAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const ExerciseSession = mongoose.model('ExerciseSession', exerciseSessionSchema);

export default ExerciseSession