import {Router} from 'express';
import userController from '../controllers/login.controller';

const router = Router();

router.get('/', userController);
router.post('/login', userController);
router.post('/register', userController);

export default router;
