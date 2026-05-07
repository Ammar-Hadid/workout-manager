import express from "express";

import requireAuth from "../middleware/requireAuth.js";
import { getExercisesByWorkoutId } from "../controllers/exerciseController.js";

const router = express.Router({ mergeParams: true });

router.get('/', requireAuth, getExercisesByWorkoutId);

export default router;