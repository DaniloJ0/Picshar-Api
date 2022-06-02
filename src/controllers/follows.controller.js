import Follow from "../models/follows.model.js";
import User from "../models/user.model.js";
import Post from "../models/post.model.js";
import followRequest from "../models/followRequest.model.js";

export const fetchFollowing = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const users = await User.find({ _id: { $in: user.follows } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Missing ..." });
  }
};

export const fetchFollower = async (req, res) => {
  const { user_id } = req.query;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: "User not found" });
    const users = await Post.find({ _id: { $in: user.followers } });
    return res.status(200).json(users);
  } catch (error) {
    return res.status(404).json({ message: "Missing ..." });
  }
};

export const requestUser = async (req, res) => {
  const id = req.user ? req.user.id : req.body.user.id;
  const { user_id } = req.body;
  if (!user_id) return res.status(400).json({ message: "Missing user_id" });
  try {
    followRequest.create({
      requester: id,
      recipient: user_id,
    }).then(() => res.status(200).json("created"));
  } catch (error) {
    return res.status(500).json({ error });
  }
};

export const responseUser = async (req, res) => {
  const id = req.user ? req.user.id : req.body.user.id;
  const { request_id, action } = req.body;
  if (!request_id || !action ) return res.status(400).json({ message: 'Missing action or request_id'});
  const fr = await followRequest.findById(request_id);
  if (!fr) return res.status(400).json({ message: "Missing request" });
  if (id === fr.recipient.toString()) {
    if (action == "accept") {
      const reciveFollow = await User.findById(id);
      const sendFollow = await User.findById(fr.requester);
      reciveFollow.followers.push(fr.requester);
      sendFollow.followers.push(id);
      reciveFollow.save();
      sendFollow.save();
      res.status(200).json({});
    }else if (action == "reject") {
        res.status(200).json({})
    }
  }
  else {
    res.status(400).json({ message: "Bad request" });
  }
};
