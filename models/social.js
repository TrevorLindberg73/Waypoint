const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const { DateTime } = require('luxon');

const socialSchema = new Schema({
    title: {type: String},
    content: {type: String},
    //user: {type: Schema.Types.ObjectId, ref: 'User'},
    date: {type: String}
},
{timestamps: true}
);

module.exports = mongoose.model('Social', socialSchema);