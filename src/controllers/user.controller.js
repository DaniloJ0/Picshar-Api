import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import * as bcrypt from '../utils/bcrypt.utils.js'

export const login =  async(req, res)=> {
    const {username, password} = req.body;
    if(!username || !password) return res.status(400).json({error: 'Missing username or password'})
    try {
        const user = await User.findOne({username});
        if (!user) return res.status(404).json({ message: 'User not found' });
        if (!bcrypt.confirmPassword(password, user.password)) {
          return res.status(401).json({ message: 'Incorrect password' });
        }

        const token = jwt.sign({
            id: user._id,
            name: user.username
        }, process.env.TOKEN_SECRET)

        return res.status(200).json(token);
    } catch (error) {
        return res.status(500).json({ error });
    }
}

export const loginToken =  async(req, res)=> {
  const {token} = req.body;
  if(!token) return res.status(400).json({error: 'Token is required'});
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(400).json({ error: 'Invalid token1' });

    return res.status(200).json({});
  } catch (error) {
    res.status(400).json({})
  }
}

export const register = async (req, res) => {
  const { username, password, email, birthdate, biografia } = req.body;
  try {
    const user = await User.create({
      username,
      password: bcrypt.encryptPassword(password),
      email,
      birthdate,
      biografia
    });
    const token = jwt.sign({
      name: user.username,
      id: user._id
    }, process.env.TOKEN_SECRET)

    user.token = token;

    return res.status(201).json(user.token);
  } catch (error) {
    return res.status(500).json({ error });
  }
}

export const InfoUser = async (req, res) => {
  const user_id = req.query;
  if (!user_id) return res.status(400).json({ message: 'Missing user_id' });
  try {
    const user = await User.findById(user_id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    return res.status(200).json({
      username: user.username,
      email: user.email,
      bio: user.biografia,
      liked_count: user.likes,
      posts_count: user.posts,
      followers_count: user.followers,
      followed_count: user.follows,
    });

  } catch (error) {
    return res.status(500).json({ error });
  }

}