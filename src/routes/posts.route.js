import * as postController from '../controllers/posts.controller.js'
import {verifyToken}  from '../middleware/auth.middleware.js'
import { Router } from 'express';
const router = Router();

router.get('/', verifyToken, (req, res) => {
    //const {post_id} = req.body;
    const post_id = req.body && req.body.post_id  ? req.body.post_id : req.query.post_id;
    if (!post_id) postController.fecthPost(req,res)
    else postController.infoPost(req, res)
})
router.post('/', verifyToken, (req, res) => {
    // const {post_id} = req.body;
    const post_id = req.body && req.body.post_id  ? req.body.post_id : req.query.post_id;
    if (!post_id) postController.createdPost(req, res)
    else postController.commentPost(req, res)
})
router.post('/like', verifyToken, postController.giveLikePost);
router.post('/save', verifyToken, postController.savePost);
router.get('/liked-by', verifyToken, postController.fetchlikesPost);
router.get('/saved-by', verifyToken, postController.savedPost);
router.get('/timeline', verifyToken, postController.fecthTimeLinePost);

export default router;