import Follow from '../models/follows.model.js'
import User from '../models/user.model.js'
import followRequest from '../models/followRequest.model.js'

export const fetchFollowing = async (req, res)=>{
    const user = await User.findById(req.query.user_id);
    const lista = user.follows;
    lista = lista.map(i => User.findById(i));
    //const seguidos = await Follow.find({});
    res.json(lista);
}

export const fetchFollower = async (req, res)=>{
    
}


export const requestUser = async (req, res)=>{
    const { id } = req.user
    const { user_id }= req.body
    if (!user_id) return res.status(400).json({ message: "Missing user_id" });
    try {
        followRequest.create({
            requester:id,
            recipient:user_id
        })
    } catch (error) {
        return res.status(500).json({ error });
    }
}


export const responseUser = async (req, res)=>{
    const { id } = req.user
    const { request_id, action} = req.body
    const fr = followRequest.findById(request_id)
    if (!fr) return res.status(400).json({ message: "Missing request"})
    if (id === fr.recipient) {
        if (action == "accept") {
            const reciveF = User.findById(id);
            const sendF = User.findById(fr.requester)
            reciveF.followers.push(fr.requester)
            sendF.followers.push(id)
            reciveF.save()
            sendF.save()
            res.status(200).json({})
        }
        if (action == "reject") {
            
        }
    }
}