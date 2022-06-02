import Post from "../models/post.model.js";
import Comment from "../models/comments.model.js";
import User from "../models/user.model.js";

//GET /posts/
export const fecthPost = async (req, res) => {
  const { author } = req.query;
  if (!author) return res.status(400).json({ message: "Missing author" });
  try {
    const autho = await Post.find({ author: { $eq: author } });
    if (!autho) return res.status(404).json({ message: "User not found" });
    const posts = autho.posts;
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(400).json({ message: "Missing author" });
  }
};

//GET /posts/liked-by
export const fetchlikesPost = async (req, res) => {
  const {user_id} = req.query;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const posts = await Post.find({ _id: { $in: user.postsLiked }});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: "Missing ..." });
  }
};

//GET /posts/saved-by
export const savedPost = async (req, res) => {
  const  id  = req.user ? req.user.id : req.query.id;
  const user = User.findById(id);
  const posts = await Post.find({ _id: { $in: user.postSaved } });
  return res.status(200).json(posts)
};

//GET /posts/timeline
export const fecthTimeLinePost = async (req, res) => {
  const Page = parseInt(req.body.page);
  const  id  = req.user ? req.user.id : req.query.id;
  const posts = await Post.find({ author: { $eq: id } })
    .skip(Page * 2 - 2)
    .limit(2);
  res.send(posts);
};

//POST /posts/
export const createdPost = async (req, res) => {
  const { img_url, bio, author } = req.body;
  if(!img_url || !bio || !author) return res.status(400).json({message: 'Missing img_url or bio or author'})
  try {
    const post = await Post.create({
      img_url,
      bio,
      author,
    });
    const user = await User.findById(author);
    user.posts.push(post._id);
    await user.save();
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
};

// GET /posts/
export const infoPost = async (req, res) => {
  const post_id = req.body && req.body.post_id  ? req.body.post_id : req.query.post_id;
  const post = await Post.findById(post_id);
  if (!post) return res.status(400).json({ error: 'post does not exists.' });
    try {
      const likes = post.likes.length;
      const comments = await Comment.find({ postId: { $eq: post_id } });
      const publi = {
        img_url: post.img_url,
        bio: post.bio,
        author: post.author,
        likes: likes,
        comments: comments,
      };
      return res.status(201).json(publi);
    } catch (error) {
      return res.status(501).json({ error: error });
    }
};

//POST /posts/like
export const giveLikePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) return res.status(500).json({ message: "Required post_id" });
  const  id  = req.user ? req.user.id : req.body.id;
  try {
    const post = await Post.findById(post_id);
    if (!post) return res.status(500).json({ message: "Post not Found" });
    const user = await User.findById(id);
    user.postsLiked.push(post._id);
    await user.save();
    post.likes.push(user._id);
    await post.save();
    return res.status(201).json({});
  } catch (error) {
    console.log(error)
    return res.status(500).json({error});
  }
};

//POST /post/save
export const savePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) return res.status(500).json({ message: "Required post_id" });
  const id = req.user ? req.user.id : req.body.id;
  try {
    const post = await Post.findById(post_id);
    if (!post) return res.status(500).json({ message: "Post not Found" });
    const user = await User.findById(id);
    user.postSaved.push(post._id);
    await user.save();
    return res.status(201).json({});
  } catch (error) {
    return res.status(500).json({ error });
  }
};

//POST /posts/
export const commentPost = async (req, res) => {
  const { post_id, comment } = req.body;
  const post = await Post.findById(post_id);
  if (post !== null || post !== undefined) {
    try {
      await Comment.create({
        postId: post_id,
        bioComment: comment,
      });
      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error });
  }
};
