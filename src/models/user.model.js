import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  birthdate: { type: String, require: true },
  biografia: { type: String, require: true },
  postsLiked: [{type: Schema.Types.ObjectId}],
  posts: [{type: Schema.Types.ObjectId}],
  follows: [{type: Schema.Types.ObjectId}],
  followers: [{type: Schema.Types.ObjectId}],
  postSaved: [{type: Schema.Types.ObjectId}],
  token: { type: String },
});

export default model('User', userSchema);