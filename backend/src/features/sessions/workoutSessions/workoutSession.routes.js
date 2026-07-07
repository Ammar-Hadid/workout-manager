import express from "express";
import requireAuth from "../../../middleware/requireAuth.js";

import {
    createWorkoutSession,
    getActiveWorkoutSession,
    getWorkoutSessionById,
    completeWorkoutSession,
    cancelWorkoutSession,
} from "./workoutSession.controller.js";

const router = express.Router();

router.post('/', requireAuth, createWorkoutSession);

router.get('/active', requireAuth, getActiveWorkoutSession);

router.get('/:workoutSessionId', requireAuth, getWorkoutSessionById);

router.post('/:workoutSessionId/complete', requireAuth, completeWorkoutSession);

router.post('/:workoutSessionId/cancel', requireAuth, cancelWorkoutSession);

export default router;