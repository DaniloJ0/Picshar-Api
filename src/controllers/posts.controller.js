import Post from '../models/post.model.js';
import Comment from '../models/comments.model.js'

//5
export const fecthPost = async (req, res)=>{
    const {author} = req.query;
    if(!author) return res.status(400).json({message: 'Missing author'})
    try {
      const autho = await Post.find({author: {$eq: author}});
      if(!autho) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json(autho);
    } catch (error) {
      return res.status(400).json({ message: 'Missing author' });
    }
}

export const fetchlikesPost = async (req, res)=>{
    
}

export const savedPost = async (req, res)=>{
    if(req.body.post_id){

    }
}

export const fecthTimeLinePost = async (req, res)=>{
    const Page = parseInt(req.body.page);
    const posts = await Post.find().skip(Page*10-10).limit(10)
    res.send(posts);
}

export const createdPost = async (req, res)=>{
    if(req.body.img_url){
        const {img_url, bio, author} = req.body;
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
    }else if(req.body.post_id){
        const {post_id, comment} = req.body;
        const post = await Post.findById(post_id);
        if (post !== null || post !== undefined) {
            try {
                const user_id = post.author;
                await Comment.create({
                  userId: user_id,
                  postId: post_id,
                  bioComment: comment
                });
              
              return res.status(201).json();
              } catch (error) {
                return res.status(500).json({ error });
              }
        }else{
            return res.status(500).json({error})
        }
    }
    

}

export const infoPost = async (req, res)=>{
    
}


export const giveLikePost = async (req, res)=>{
    
}

export const savePost = async (req, res)=>{
    
}

export const commentPost = async (req, res)=>{
    const {post_id, comment} = req.body;
    const post = await Post.findById(post_id);
    if (post !== null || post !== undefined) {
        try {
            const user_id = post.author;
            await Comment.create({
              userId: user_id,
              postId: post_id,
              bioComment: comment
            });
          
          return res.status(201).json();
          } catch (error) {
            return res.status(500).json({ error });
          }
    }else{
        return res.status(500).json({error})
    }
}
