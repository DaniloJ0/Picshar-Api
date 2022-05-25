import { Router } from 'express';
import followController from '../controllers/follows.controller'
const router = Router();

router.get('/following', followController.fetchFollowing);
router.get('/followers', followController.fetchFollower);
router.post('/request', followController.requestUser);
router.post('/response', followController.responseUser);


export default router;