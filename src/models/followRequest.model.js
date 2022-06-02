import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const followRequest = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        required: true
    },
    recipient: {
<<<<<<< HEAD
        type: Schema.Types.ObjectIdnt,
=======
        type: Schema.Types.ObjectId,
>>>>>>> 6c7f8edbaaadb940bbed54c75ce461cc42f5a8af
        required: true
    }
});

export default model('Request', followRequest);