import { Router } from 'express';
import postController from '../controllers/posts.controller'
const router = Router();

router.get('/', postController.fecthPost);
router.get('/', postController.infoPost);
router.post('/', postController.createdPost);
router.post('/', postController.commentPost);
router.post('/like', postController.giveLikePost);
router.post('/save', postController.savePost);
router.get('/liked-by', postController.fetchLikePost);
router.get('/saved-by', postController.savedPost);
router.get('/timeline', postController.fecthTimeLinePost);


export default router;