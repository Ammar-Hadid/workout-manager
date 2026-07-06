import express from 'express';

import {
    login,
    register,
    getMe,
    logout,
} from './auth.controller.js';

import optionalAuth from "../../middleware/optionalAuth.js";

const router = express.Router();



router.post('/login', login);

router.post('/register', register);

router.post('/logout', logout);

router.get('/me', optionalAuth, getMe)

export default router
