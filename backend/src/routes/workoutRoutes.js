import express from "express";
import requireAuth from "../middleware/requireAuth.js";

import {
    getWorkoutById,
    getWorkoutsByProgramId,
    createWorkout
} from "../controllers/workoutController.js";

const router = express.Router({ mergeParams: true })

// GET all workouts 
router.get('/', requireAuth, getWorkoutsByProgramId);

// GET specific workout
router.get('/:workoutId', requireAuth, getWorkoutById);

// POST workout
router.post('/', requireAuth, createWorkout);

export default router;
