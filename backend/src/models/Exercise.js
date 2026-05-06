import mongoose from "mongoose"
import { MUSCLE_GROUP_IDS } from "../constants/muscleGroups"

const exerciseSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },

        workout: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Workout',
            required: true
        },

        order: {
            type: Number,
            min: 1,
            required: true
        },

        name: {
            type: String,
            minlength: 3,
            maxlength: 25,
            required: true,
            trim: true
        },

        muscleGroup: {
            type: String,
            enum: MUSCLE_GROUP_IDS,
            required: true
        },

        restTime: {
            type: Number,
            min: 10,
            max: 600,
            required: true
        },

        sets: {
            type: Number,
            min: 1,
            max: 20,
            required: true
        },

        minReps: {
            type: Number,
            min: 1,
            max: 50,
            required: true
        },

        maxReps: {
            type: Number,
            min: 1,
            max: 50,
            required: true
        }
    },

    { timestamps: true }
);

exerciseSchema.index({ user: 1, workout: 1, order: 1 }, { unique: true });

const Exercise = mongoose.model('Exercise', exerciseSchema);

export default Exercise;