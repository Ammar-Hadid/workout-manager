import express from 'express';

import { createProgram } from '../controllers/programController.js';
import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();

router.post('/', requireAuth, createProgram);

export default router;