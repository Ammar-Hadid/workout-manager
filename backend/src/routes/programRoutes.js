import express from 'express';

import {
    createProgram,
    getAllPrograms,
    getProgramById,
    updateProgram,
    deleteProgram
} from '../controllers/programController.js';

import requireAuth from '../middleware/requireAuth.js';

const router = express.Router();


// Get all programs
router.get('/', requireAuth, getAllPrograms);

// Get program by id
router.get('/:id', requireAuth, getProgramById)

// Post program
router.post('/', requireAuth, createProgram);

// Update program
router.patch('/:id', requireAuth, updateProgram)

// Delete program
router.delete('/:id', requireAuth, deleteProgram)




export default router;