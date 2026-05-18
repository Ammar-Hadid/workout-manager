import mongoose from "mongoose";

const programSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        name: {
            type: String,
            minlength: 3,
            maxlength: 25,
            required: true,
            trim: true
        },

        split: {
            type: String,
            enum: ['full-body', 'ppl', 'upper-lower', 'custom'],
            required: true
        },

        trainingDaysPerWeek: {
            type: Number,
            min: 1,
            max: 7,
            required: true
        },

        isActive: {
            type: Boolean,
            default: false
        }
    },

    { timestamps: true }
);


const Program = mongoose.model('Program', programSchema);

export default Program

