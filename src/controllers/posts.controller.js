import Post from '../models/post.model.js';
import Comment from '../models/comments.model.js'
import User from '../models/user.model.js'
//5
export const fecthPost = async (req, res) => {
  const { author } = req.query;
  if (!author) return res.status(400).json({ message: "Missing author" });
  try {
    const autho = await Post.find({ author: { $eq: author } });
    if (!autho) return res.status(404).json({ message: "User not found" });
    return res.status(200).json(autho);
  } catch (error) {
    return res.status(400).json({ message: "Missing author" });
  }
}

export const fetchlikesPost = async (req, res) => {
  // const user_id = req.query;
  // if(!user_id ) return res.status(400).json({message: 'Missing user_id'});
  // try {
  //   const post = await Post.find({likes: user_id}).populate('likes');
  //   return res.status(200).json(post);
  // } catch (error) {
  //   return res.status(400).json({ message: 'Missing user_id' });
  // }

  const {user_id} = req.query;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const posts = await Post.find({ _id: { $in: user.postsLiked }});
    return res.status(200).json(posts);
  } catch (error) {
    return res.status(404).json({ message: "Missing user_id2" });
  }
}

export const savedPost = async (req, res) => {
  if (req.body.post_id) {

  }
}

export const fecthTimeLinePost = async (req, res) => {
  const Page = parseInt(req.body.page);
  const { id } = req.user;
  const posts = await Post.find({ author: { $eq: id } })
    .skip(Page * 2 - 2)
    .limit(2);
  res.send(posts);
}

export const createdPost = async (req, res) => {
  const { img_url, bio, author } = req.body;
  if (!img_url || !bio || !author) return res.status(400).json({ message: 'Missing img_url or bio or author' })
  try {
    await Post.create({
      img_url,
      bio,
      author,
    });
    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const infoPost = async (req, res) => {
  const { post_id } = req.body;
  const post = await Post.findById(post_id);
  if (!post) return res.status(400).json({ error });
  try {
    const likes = await Like.find({ postId: { $eq: post_id } }).count();
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
    return res.status(501).json({ error });
  }
}


export const giveLikePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) return res.status(500).json({ message: "Required post_id" });
  const { id } = req.user;
  try {
    const post = await Post.findById(post_id);
    if (!post) return res.status(500).json({ message: "Post not Found" });
    const user = await User.findById(id);
    user.postsLiked.push(post._id);
    await user.save();
    return res.status(201).json({});
  } catch (error) {
    console.log(error)
    return res.status(500).json({ error });
  }
}

export const savePost = async (req, res) => {
  const { post_id } = req.body;
  if (!post_id) return res.status(500).json({ message: "Required post_id" });
  const { id } = req.user;
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
}

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
}
