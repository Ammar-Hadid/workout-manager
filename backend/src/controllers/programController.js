import Program from "../models/Program.js";
import mongoose from "mongoose";

export const getAllPrograms = async (req, res) => {
    try {
        const programs = await Program.find({ user: req.userId }).sort({ createdAt: -1 });

        return res.status(200).json({ programs })
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const getProgramById = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: `Invalid program id: ${id}` });
    }

    try {
        const program = await Program.findOne({ user: req.userId, _id: id });

        if (!program) return res.status(404).json({ error: 'Program not found.' });

        return res.status(200).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error' });
    }
};

export const createProgram = async (req, res) => {
    const { name, split, trainingDaysPerWeek } = req.body;

    // #region name validation
    if (!name) return res.status(400).json({ error: 'Please name your program to continue.' });
    if (name.trim().length < 3) return res.status(400).json({ error: 'Program names must be at least 3 characters long.' })
    // #endregion

    // #region split validation
    if (!split) return res.status(400).json({ error: 'Please select a split to structure your workouts.' });
    // #endregion

    // #region trainingDaysPerWeek validation
    if (trainingDaysPerWeek === undefined) return res.status(400).json({ error: 'Please select how many days a week you plan to train.' });

    const days = Number(trainingDaysPerWeek);

    if (isNaN(days)) return res.status(400).json({ error: 'Please enter a number for training days per week.' });

    if (!Number.isInteger(days)) return res.status(400).json({ error: 'Please enter a whole number for training days per week.' })

    if (days < 1 || days > 7) return res.status(400).json({ error: `You entered [${trainingDaysPerWeek}]. Please pick a number of days between 1 and 7.` })

    // #endregion

    try {
        const program = await Program.create({
            user: req.userId,
            name,
            split,
            trainingDaysPerWeek: days
        })

        return res.status(201).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`);
        return res.status(500).json({ error: 'Server error' })
    }
};

export const updateProgram = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
        return res.status(400).json({ error: `Invalid program Id: ${id}` });
    }

    try {
        const program = await Program.findOneAndUpdate(
            { user: req.userId, _id: id },
            { ...req.body },
            { new: true }
        );

        if (!program) return res.status(404).json({ error: 'Program not found.' })

        res.status(200).json({ program });
    }

    catch (error) {
        console.error(`ERROR: ${error}`)
        res.status(500).json({ error: 'Server error' });
    };
};