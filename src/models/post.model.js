import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const postSchema = new Schema({
  img_url: { type: String, required: true },
  bio: { type: String, required: true },
  author: { type: Schema.Types.ObjectId, require: true },
  likes: [{type: Schema.Types.ObjectId}],
  comment: [{type: Schema.Types.ObjectId}],
});

export default model('Post', postSchema);

