const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Schema for messages
const messageSchema = new Schema({
    userId: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String}
});

// Schema for groups
const groupSchema = new Schema({
    category: {
        type: String,
        required: [true, 'category is required'],
        enum: ['Sports', 'Gaming', 'Board Games', 'Other']
    },
    title: {
        type: String,
        required: [true, 'title is required']
    },
    hostName: {
        type: Schema.Types.ObjectId, ref:'User'
    },
    description: {
        type: String,
        required: [true, 'description is required'],
    },
    preferences: {
        type: String,
        required: [true, 'preferences is required'],
        minLength: [10, 'the preferences should have at least 10 characters']
    },
    // maxSize:{
    //     type: Number,
    //     required: [true, 'size is required']
    // },
    // size: {type: Number, required: [true]},
    messages: [messageSchema]
});

//collection name is group in the database
module.exports = mongoose.model('Group', groupSchema);