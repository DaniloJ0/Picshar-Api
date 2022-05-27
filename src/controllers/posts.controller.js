import Post from '../models/post.model.js';

export const fecthPost = async (req, res)=>{

}

export const fetchlikesPost = async (req, res)=>{
    
}

export const savedPost = async (req, res)=>{
    
}

export const fecthTimeLinePost = async (req, res)=>{
    res.send("llegue "+ req.body.page);
}


export const createdPost = async (req, res)=>{
    const {img_url, bio, author} = req.body;
    try {
      const post = await Post.create({
        img_url,
        bio,
        author
      });
    
    return res.status(201).json();
    } catch (error) {
      return res.status(500).json({ error });
    }
    //res.send(req.body)
}

export const infoPost = async (req, res)=>{
    
}


export const giveLikePost = async (req, res)=>{
    
}

export const savePost = async (req, res)=>{
    
}

export const commentPost = async (req, res)=>{

}
