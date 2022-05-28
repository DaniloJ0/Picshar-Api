import Follow from '../models/follows.model.js'
import User from '../models/user.model.js'

export const fetchFollowing = async (req, res)=>{
    const user = await User.findById(req.query.user_id);
    const lista = user.follows;
    lista = lista.map(i => await User.findById(i));
    //const seguidos = await Follow.find({});
    res.json(lista);
}

export const fetchFollower = async (req, res)=>{
    
}


export const requestUser = async (req, res)=>{
    
}


export const responseUser = async (req, res)=>{
    
}