import * as followController from '../controllers/follows.controller.js'
import {verifyToken}  from '../middleware/auth.middleware.js'
import { Router } from 'express';
const router = Router();

router.get('/following', verifyToken, followController.fetchFollowing);
router.get('/followers', verifyToken, followController.fetchFollower);
router.post('/request', verifyToken, followController.requestUser);
router.post('/response', verifyToken, followController.responseUser);


export default router;