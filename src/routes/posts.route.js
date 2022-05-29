import * as postController from '../controllers/posts.controller.js'
import { Router } from 'express';
const router = Router();

router.get('/', (req, res) => {
    const {post_id} = req.body;
    if(!post_id) postController.fecthPost(req, res);
    else postController.infoPost(req, res);
});
router.post('/', postController.createdPost);
//router.post('/', postController.commentPost);
router.post('/like', postController.giveLikePost);
router.post('/save', postController.savePost);
router.get('/liked-by', postController.fetchlikesPost);
router.get('/saved-by', postController.savedPost);
router.get('/timeline', postController.fecthTimeLinePost);

export default router;