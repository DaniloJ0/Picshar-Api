import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const savePSchema = new Schema({
  userId: {type: Schema.Types.ObjectId, required: true},
  postId: { type: Schema.Types.ObjectId, required: true},
});

export default model('SavedPost', savePSchema);