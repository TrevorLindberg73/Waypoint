const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

// Schema for users
const userSchema = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String, unique: true},
    password: {type: String},
    profilePictureUrl: { type: String }
});

// Password hashing
userSchema.pre('save', function(next) {
    let user = this;
    if (!user.isModified('password')){
        return next();
    } else {
        bcrypt.hash(user.password, 10)
        .then(hash => {
            user.password = hash;
            next();
        })
        .catch(err => next(err));
    }
});

// Password validation
userSchema.methods.comparePassword = function(loginPassword) {
    return bcrypt.compare(loginPassword, this.password);
}

module.exports = mongoose.model('User', userSchema);