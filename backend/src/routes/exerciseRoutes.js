import express from "express";

import requireAuth from "../middleware/requireAuth.js";
import {
    getExercisesByWorkoutId,
    getExerciseById,
    createExercise
} from "../controllers/exerciseController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, getExercisesByWorkoutId);

router.get('/:exerciseId', requireAuth, getExerciseById);

router.post('/', requireAuth, createExercise)

export default router;