import * as userController from '../controllers/user.controller.js';
import {verifyToken}  from '../middleware/auth.middleware.js'
import {Router} from 'express';
const router = Router();

// router.get('/', userController.inicio);
router.post('/login', userController.login);
router.post('/register', userController.register);

export default router;
