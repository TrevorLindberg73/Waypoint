const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const socialSchema = new Schema({
    title: {type: String},
    description: {type: String},
    img: {type: String, unique: true},
    user: {type: Schema.Types.ObjectId, ref: 'User'},
});

module.exports = mongoose.model('Social', socialSchema);