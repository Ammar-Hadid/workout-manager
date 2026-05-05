import Program from "../models/Program.js";
import mongoose from "mongoose";

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
        ...(name && { name }),
        ...(split && { split }),
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

    try {
        const program = await Program.findOneAndDelete({ user: req.userId, _id: id });

        if (!program) return res.status(404).json({ error: 'Program not found.' });

        return res.status(200).json({ program, message: 'Program deleted successfully.' })
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error.' })
    }
};