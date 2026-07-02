import mongoose from "mongoose";
import ExerciseSession from "./ExerciseSession.model.js";

export const startExerciseSession = async (req, res) => {
    const { workoutSessionId, exerciseSessionId } = req.params;

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        return res.status(400).json({ error: 'Invalid workout session id.' })
    }

    if (!mongoose.isValidObjectId(exerciseSessionId)) {
        return res.status(400).json({ error: 'Invalid exercise session id.' })
    }

    try {
        const exerciseSession = await ExerciseSession.findOneAndUpdate(
            {
                user: req.userId,
                _id: exerciseSessionId,
                workoutSession: workoutSessionId,
                status: {
                    $in: ['not-started', 'skipped'],
                },
            },

            [
                {
                    $set: {
                        status: 'in-progress',

                        startedAt: {
                            $ifNull: ['$startedAt', '$$NOW'],
                        },

                        skippedAt: null,
                    }
                },
            ],

            {
                new: true,
                runValidators: true,
            },
        );

        if (!exerciseSession) {
            return res.status(404).json({ error: 'Exercise session not found.' });
        }

        return res.status(200).json({ exerciseSession });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
}

export const completeExerciseSession = async (req, res) => {
    const { workoutSessionId, exerciseSessionId } = req.params;

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        return res.status(400).json({ error: 'Invalid workout session id.' });
    }

    if (!mongoose.isValidObjectId(exerciseSessionId)) {
        return res.status(400).json({ error: 'Invalid exercise session id.' });
    }

    try {
        const exerciseSession = await ExerciseSession.findOneAndUpdate(
            {
                user: req.userId,
                workoutSession: workoutSessionId,
                _id: exerciseSessionId,
                status: 'in-progress'
            },

            {
                status: 'completed',
                completedAt: new Date(),
            },

            {
                new: true,
                runValidators: true,
            }
        );

        if (!exerciseSession) {
            return res.status(404).json({ error: 'Exercise session not found' });
        }

        return res.status(200).json({ exerciseSession });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' })
    }
}

export const skipExerciseSession = async (req, res) => {
    const { workoutSessionId, exerciseSessionId } = req.params;

    if (!mongoose.isValidObjectId(workoutSessionId)) {
        return res.status(400).json('Invalid workout session id.');
    }

    if (!mongoose.isValidObjectId(exerciseSessionId)) {
        return res.status(400).json('Invalid exercise session id.');
    }

    try {
        const exerciseSession = await ExerciseSession.findOneAndUpdate(
            {
                user: req.userId,
                workoutSession: workoutSessionId,
                _id: exerciseSessionId,
                status: {
                    $in: ['not-started', 'in-progress'],
                },
            },

            {
                status: 'skipped',
                skippedAt: new Date(),
            },

            {
                new: true,
                runValidators: true,
            },
        );

        if (!exerciseSession) {
            return res.status(404).json({ error: 'Exercise session not found.' });
        }

        return res.status(200).json({ exerciseSession });
    }

    catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server error.' });
    }
}

