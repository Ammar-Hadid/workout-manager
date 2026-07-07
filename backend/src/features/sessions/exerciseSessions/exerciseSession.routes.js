import express from "express";
import requireAuth from "../../../middleware/requireAuth.js";

import {
    startExerciseSession,
    completeExerciseSession,
    skipExerciseSession,
} from "./exerciseSession.controller.js";

const router = express.Router();

router.post('/:exerciseSessionId/start', requireAuth, startExerciseSession);

router.post('/:exerciseSessionId/complete', requireAuth, completeExerciseSession);

router.post('/:exerciseSessionId/skip', requireAuth, skipExerciseSession);

export default router;