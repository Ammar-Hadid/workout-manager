import express from "express";

import requireAuth from "../middleware/requireAuth.js";
import {
    getExercisesByWorkoutId,
    getExerciseById
} from "../controllers/exerciseController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, getExercisesByWorkoutId);

router.get('/:exerciseId', requireAuth, getExerciseById)

export default router;