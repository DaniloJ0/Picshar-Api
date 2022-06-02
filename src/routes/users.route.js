import * as userController from '../controllers/user.controller.js';
import {Router} from 'express';
import {verifyToken} from '../middleware/auth.middleware.js'
const router = Router();

router.get('/', verifyToken, userController.InfoUser);
router.post('/id', userController.getUserId);
router.post('/login', (req, res) => {
    const {token} = req.body;
    if (!token) userController.login(req, res)
    else userController.loginToken(req, res)
})
router.post('/', userController.register);

//new
router.delete('/', userController.deleteUser);

export default router;
