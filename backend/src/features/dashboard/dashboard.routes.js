import express from "express";
import requireAuth from "../../middleware/requireAuth.js";

import {
    getDashboard
} from "./dashboard.controller.js";

const router = express.Router();

router.get('/', requireAuth, getDashboard);

export default router;