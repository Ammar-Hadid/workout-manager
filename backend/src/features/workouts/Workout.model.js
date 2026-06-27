import mongoose from "mongoose";

const workoutSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        program: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Program',
            required: true
        },

        name: {
            type: String,
            minlength: 3,
            maxlength: 25,
            required: true,
            trim: true,
        },

        order: {
            type: Number,
            min: 1,
            required: true
        },

        duration: {
            type: Number,
            min: 5,
            max: 300,
            required: true
        }
    },

    { timestamps: true }
);

workoutSchema.index({ user: 1, program: 1, order: 1 }, { unique: true });

const Workout = mongoose.model('Workout', workoutSchema);

export default Workout;