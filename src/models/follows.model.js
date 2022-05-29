import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const followSchema = new Schema({
    userSF_id: { type: Schema.Types.ObjectId, required: true},
    userRF_id: { type: Schema.Types.ObjectId, required: true},
})

export default model('Follow', followSchema);