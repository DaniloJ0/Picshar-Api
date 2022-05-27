import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const commentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, required: true},
  postId: { type: Schema.Types.ObjectId, required: true},
  bioComment: { type: String, require: true },
});

export default model('Comment', commentSchema);