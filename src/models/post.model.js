import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const PostSchema = new Schema({
    img_url: { type: String, required: true },
    bio: { type: String, required: true },
    author: {type: Schema.Types.ObjectId, require: true},
  });
  
  export default model('Post', PostSchema);