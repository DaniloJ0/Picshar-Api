import Post from '../models/post.model.js';
import Comment from '../models/comments.model.js'
import Like from '../models/comments.model.js'

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
    // const user_id = req.query;
    // if(!user_id ) return res.status(400).json({message: 'Missing user_id'});
    // try {
    //   const post = await Post.find({likes: user_id}).populate('likes');
    //   return res.status(200).json(post);
    // } catch (error) {
    //   return res.status(400).json({ message: 'Missing user_id' });
    // }
    
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
  // const {post_id} = req.body;
  // if(!post_id) return res.status(400).json({error: 'Missing post_id'});
  // try {
  //   const post = Post.find(post_id);
  //   if(!post_id) return res.status(404).json({message: 'Post not found'});
  //   const like = await Like.create({
  //     post_id,
      
  //   });

  //   return res.status(201).json(post);
  // } catch (error) {
    
  // }
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
