import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import * as bcrypt  from '../utils/bcrypt.utils.js'

export const login =  async(req, res)=> {
    const {username, password} = req.body;
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

      user.token =token;

      return res.status(200).json(token);
  } catch (error) {
      return res.status(500).json({ error });
  }
}


export const register =  async(req, res)=> {
    const {username, password,email,birthdate,biografia} = req.body;
    try {
      const user = await User.create({
        username,
        password: bcrypt.encryptPassword(password),
        email,
        birthdate,
        biografia,
      });
      const token = jwt.sign({
        name: user.username,
        id: user._id
      },process.env.TOKEN_SECRET)

    user.token= token;
    
    return res.status(201).json(user);
    } catch (error) {
      return res.status(500).json({ error });
    }

}



export const inicio =  async(req, res)=> {

}

