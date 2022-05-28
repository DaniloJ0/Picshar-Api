import * as userController from '../controllers/user.controller.js';
import {Router} from 'express';
const router = Router();

router.get('/', userController.InfoUser);
router.post('/register', userController.register);
router.post('/login', (req, res) => {
    const {token} = req.body;
    if (!token) userController.login(req, res);
    else userController.loginToken(req, res)});

export default router;
