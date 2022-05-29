import * as userController from '../controllers/user.controller.js';
import {verifyToken}  from '../middleware/auth.middleware.js'
import {Router} from 'express';
const router = Router();

router.get('/', verifyToken, userController.InfoUser);
router.post('/login', (req, res) => {
    const {token} = req.body;
    if (!token) userController.login(req, res)
    else (userController.loginToken(req, req))
})
router.post('/', userController.register);

export default router;
