import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const likeSchema = new Schema({
<<<<<<< HEAD
    post_id: { type: Schema.Types.ObjectId, required: true },
    author: { type: Schema.Types.ObjectId, required: true },
});

export default model('Like', likeSchema);

=======
  postId: { type: Schema.Types.ObjectId, required: true},
});

export default model('Like', likeSchema);
>>>>>>> 79fe319b1d3eef94c405ebe550e9d68154c734a8
