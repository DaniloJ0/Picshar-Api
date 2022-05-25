import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  display_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  token: {type: String, required: true}
});

export default model('User', userSchema);