import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const likeSchema = new Schema({
  postId: { type: Schema.Types.ObjectId, required: true},
});

export default model('Like', likeSchema);