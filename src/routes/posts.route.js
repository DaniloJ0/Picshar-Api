import * as postController from '../controllers/posts.controller.js'
import { Router } from 'express';
const router = Router();

router.get('/', postController.fecthPost);
router.get('/', postController.infoPost);
router.post('/', postController.createdPost);
router.post('/', postController.commentPost);
router.post('/like', postController.giveLikePost);
router.post('/save', postController.savePost);
router.get('/liked-by', postController.fetchlikesPost);
router.get('/saved-by', postController.savedPost);
router.get('/timeline', postController.fecthTimeLinePost);


export default router;