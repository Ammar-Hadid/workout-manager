import express from "express";
import requireAuth from "../../../middleware/requireAuth.js";

import {
    createWorkoutSession,
    getActiveWorkoutSession,
    getWorkoutSessionById,
    completeWorkoutSession,
    pauseWorkoutSession,
    discardWorkoutSession,
    resumeWorkoutSession
} from "./workoutSession.controller.js";

const router = express.Router();

router.post('/', requireAuth, createWorkoutSession);

router.get('/active', requireAuth, getActiveWorkoutSession);

router.get('/:workoutSessionId', requireAuth, getWorkoutSessionById);

router.post('/:workoutSessionId/complete', requireAuth, completeWorkoutSession);

router.post('/:workoutSessionId/pause', requireAuth, pauseWorkoutSession);

router.post('/:workoutSessionId/resume', requireAuth, resumeWorkoutSession);

router.post('/:workoutSessionId/discard', requireAuth, discardWorkoutSession);

export default router;
