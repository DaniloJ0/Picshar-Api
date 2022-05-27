import mongoose from 'mongoose';
const { Schema, model } = mongoose;

const followRequest = new Schema({
    requester: {
        type: Schema.Types.ObjectId,
        required: true
    },
    recipient: {
        type: Schema.Types.ObjectIdnt,
        required: true
    },
    status: {
        type: int,
        required: true
    }
     
});

export default model('Request', followRequest);


