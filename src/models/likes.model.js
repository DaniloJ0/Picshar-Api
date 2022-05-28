import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const likeSchema = new Schema({
    post_id: { type: Schema.Types.ObjectId, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
});

export default model('Like', likeSchema);

