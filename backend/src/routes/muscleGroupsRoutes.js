import express from "express";

import { getMuscleGroups } from "../controllers/muscleGroupsController.js";

const router = express.Router();

router.get('/', getMuscleGroups);

export default router