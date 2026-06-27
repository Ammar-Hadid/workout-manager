import express from "express";

import { getMuscleGroups } from "./muscleGroups.controller.js";

const router = express.Router();

router.get('/', getMuscleGroups);

export default router