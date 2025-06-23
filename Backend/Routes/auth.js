import express from 'express';
import { register, login } from '../Controllers/authController.js';
const router = express.Router();

// @route   POST /api/auth/register
// @desc    Register new user
// @access  Public
router.post('/register', register);

// @route   POST /api/auth/login
// @desc    Authenticate user
// @access  Public
router.post('/login', login);

export default router;
