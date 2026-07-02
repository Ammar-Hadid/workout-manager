import express from "express";
import requireAuth from "../../middleware/requireAuth.js";

import {
    getWorkoutsThisWeek
} from "./dashboard.controller.js";

const router = express.Router();

router.get('/workouts/this-week', requireAuth, getWorkoutsThisWeek);

export default router;