import mongoose from "mongoose";

const workoutSessionSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },

    program: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Program',
        required: true,
    },

    workout: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Workout',
        required: true,
    },

    workoutNameSnapshot: {
        type: String,
        required: true,
    },

    workoutOrderSnapshot: {
        type: Number,
        required: true,
    },

    workoutDurationSnapshot: {
        type: Number,
        required: true,
    },

    status: {
        type: String,
        enum: ['completed', 'in-progress', 'cancelled'],
        default: 'in-progress',
        required: true,
    },

    startedAt: {
        type: Date,
        default: Date.now,
        required: true,
    },

    completedAt: {
        type: Date,
        default: null,
    },

    cancelledAt: {
        type: Date,
        default: null,
    },
}, { timestamps: true });

const WorkoutSession = mongoose.model('WorkoutSession', workoutSessionSchema);

export default WorkoutSession;