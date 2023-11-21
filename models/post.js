const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const postSchema = new Schema({

    title: {type: String, required: [true, 'title is required']},
    author: {type: Schema.Types.ObjectId, ref: 'User'},
    content: {type: String, required: [true, 'content is required'], 
                minLength: [10, 'content should be longer than 10 characters']}
},
{timestamps: true}
);

module.exports = mongoose.model('Post', postSchema);