import express from 'express';
import { authenticateJWT } from '@shamariishmael/shared';
import * as userController from '../controllers/userControllers';

const router = express.Router();

router.post('/register', userController.registerUser);

router.post('/login', userController.loginUser);

router.get('/me', authenticateJWT, userController.getMe);

export default router;