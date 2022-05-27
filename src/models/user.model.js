import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const userSchema = new Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, require: true },
  birthdate: { type: String, require: true },
  biografia: { type: String, require: true },
  follows: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  followers: [
    {
      user: {
        type: Schema.Types.ObjectId,
      },
    },
  ],
  postSaved: [],
  token: { type: String },
});

export default model('User', userSchema);