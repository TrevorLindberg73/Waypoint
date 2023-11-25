const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const newsSchema = new Schema({
    title: {type: String, required: true},
    category: {type: String, required: true},
    description: {type: String, default: ''},
    creator: {type: String, default: ''},
    link: {type: String, default: ''},
    imageURL: {type: String, default: ''},
    pubDate: {type: Date, required:true},
    guid: {type: String, required: true, unique: true},
    createdAt: {type: Date, default: Date.now, expires: '1d'}
});

newsSchema.index({ createdAt: 1 }, { expireAfterSeconds: 0 });

module.exports = mongoose.model('News', newsSchema);