import mongoose from "mongoose";

import Program from "../models/Program.js";
import Workout from "../models/Workout.js";
import Exercise from "../models/Exercise.js";


import validateProgram from "../utils/validators/programValidator.js";

export const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find({ user: req.userId }).sort({ createdAt: -1 });

        return res.status(200).json({ programs })
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error.' });
    }
};

export const getProgramById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: `Invalid program id: ${id}.` });
    }

    try {
        const program = await Program.findOne({ user: req.userId, _id: id });

        if (!program) return res.status(404).json({ error: 'Program not found.' });

        return res.status(200).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error.' });
    }
};

export const createProgram = async (req, res) => {
    const { name, split, trainingDaysPerWeek } = req.body;

    const errors = validateProgram(req.body);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }

    const days = Number(trainingDaysPerWeek);

    try {
        const program = await Program.create({
            user: req.userId,
            name: name.trim(),
            split,
            trainingDaysPerWeek: days
        })

        return res.status(201).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error.' })
    }
};

export const updateProgram = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: `Invalid program Id: ${id}.` });
    }

    const { name, split, trainingDaysPerWeek } = req.body;

    const errors = validateProgram(req.body, true);

    if (Object.keys(errors).length > 0) {
        return res.status(400).json({ errors })
    }


    const updatedFields = {
        ...(name !== undefined && { name }),
        ...(split !== undefined && { split }),
        ...(trainingDaysPerWeek !== undefined && { trainingDaysPerWeek: Number(trainingDaysPerWeek) })
    }


    try {
        const program = await Program.findOneAndUpdate(
            { user: req.userId, _id: id },
            updatedFields,
            { new: true }
        );

        if (!program) return res.status(404).json({ error: 'Program not found.' })

        return res.status(200).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`)
        return res.status(500).json({ error: 'Server error.' });
    };
};

export const deleteProgram = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid program id.' })
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const program = await Program
            .findOne({ user: req.userId, _id: id })
            .session(session);


        if (!program) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Program not found.' });
        }

        const workoutIds = await Workout
            .find({ user: req.userId, program: program._id })
            .distinct("_id")
            .session(session);

        await Exercise.deleteMany({
            user: req.userId,
            workout: { $in: workoutIds }
        }).session(session);

        await Workout.deleteMany({
            user: req.userId,
            program: program._id
        }).session(session);

        await Program.deleteOne({
            user: req.userId,
            _id: program._id
        }).session(session);

        await session.commitTransaction();

        return res.status(200).json({ program, message: 'Program deleted successfully.' })
    }

    catch (error) {
        await session.abortTransaction();
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }

    finally {
        await session.endSession();
    }
};

// Activate program
export const activateProgram = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: 'Invalid program id.' });
    }

    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const program = await Program.findOneAndUpdate(
            { user: req.userId, _id: id },
            { isActive: true },
            { new: true }
        ).session(session);

        if (!program) {
            await session.abortTransaction();
            return res.status(404).json({ error: 'Program not found.' });
        }

        await Program.updateMany(
            { user: req.userId, _id: { $ne: id } },
            { isActive: false }
        ).session(session);

        await session.commitTransaction();
        return res.status(200).json({ program });
    }

    catch (error) {
        await session.abortTransaction();
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }

    finally {
        session.endSession();
    }
}

// Get active programs
export const getActiveProgram = async (req, res) => {
    try {
        const activeProgram = await Program.findOne({ user: req.userId, isActive: true });

        return res.status(200).json({ program: activeProgram });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
}