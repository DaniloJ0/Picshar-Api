import Post from '../models/post.model.js';
import Comment from '../models/comments.model.js'
import Like from '../models/likes.model.js'

export const fecthPost = async (req, res) => {
  const { author } = req.query;
  try {
    const autho = await Post.find({ author: { $eq: author } });
    if (!autho) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json(autho);
  } catch (error) {
    return res.status(400).json({ message: 'Missing author' });
  }
}

export const fetchlikesPost = async (req, res) => {

}

export const savedPost = async (req, res) => {

}

export const fecthTimeLinePost = async (req, res) => {
  const Page = parseInt(req.body.page);
  const posts = await Post.find().sort({ _id: -1 }).skip(Page * 2 - 2).limit(2)
  res.send(posts);
}

export const createdPost = async (req, res) => {
  const { img_url, bio, author } = req.body;
  try {
    await Post.create({
      img_url,
      bio,
      author
    });

    return res.status(201).json();
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const infoPost = async (req, res) => {
  const { post_id } = req.body;
  const post = await Post.findById(post_id);
  if (post !== null || post !== undefined) {
    try {
      const likes = await Like.find({ postId: { $eq: post_id } }).count()
      const comments = await Comment.find({ postId: { $eq: post_id } });
      const publi = {
        img_url: post.img_url,
        bio: post.bio,
        author: post.author,
        likes: likes,
        comments: comments
      }
      return res.status(201).json(publi)
    } catch (error) {
      return res.status(501).json({ error })
    }
  } else {
    return res.status(500).json({ error })
  }
}


export const giveLikePost = async (req, res) => {
  const { post_id } = req.body;
  const post = await Post.findById(post_id);
  if (post !== null || post !== undefined) {
    try {
      await Like.create({
        postId: post_id,
      });
      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error })
  }
}

export const savePost = async (req, res) => {

}

export const commentPost = async (req, res) => {
  const { post_id, comment } = req.body;
  const post = await Post.findById(post_id);
  if (post !== null || post !== undefined) {
    try {
      await Comment.create({
        postId: post_id,
        bioComment: comment
      });

      return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
  } else {
    return res.status(500).json({ error })
  }
}
