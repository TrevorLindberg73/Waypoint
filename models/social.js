// social.js (or your model file)

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const commentSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    },
    text: String,
    firstName:String,
    lastName:String
    // Add any other fields you want for comments
}, { timestamps: true });

const socialSchema = new Schema({
    title: String,
    content: String,
    user: { type: Schema.Types.ObjectId, ref: 'User' },
    author: String,
    comments: [commentSchema],
    likes: [{ type: Schema.Types.ObjectId, ref: 'User' }], // Array of users who liked the post
}, { timestamps: true });

module.exports = mongoose.model('Social', socialSchema);
