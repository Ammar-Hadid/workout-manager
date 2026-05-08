import express from "express";

import requireAuth from "../middleware/requireAuth.js";
import {
    getExercisesByWorkoutId,
    getExerciseById,
    createExercise,
    updateExercise
} from "../controllers/exerciseController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, getExercisesByWorkoutId);

router.get('/:exerciseId', requireAuth, getExerciseById);

router.post('/', requireAuth, createExercise);

router.patch('/:exerciseId', requireAuth, updateExercise);

export default router;