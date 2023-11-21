const Post = require('../models/post');

exports.isGuest = (req, res, next) => {
    if(!req.session.user){
        return next();
    } else {
        req.flash('errpr', 'Already Logged In');
        return res.redirect('/users/profile');
    }
};

exports.isLoggedIn = (req, res, next) => {
    if(req.session.user){
        return next();
    } else {
        req.flash('error', 'Must Login First');
        return res.redirect('/users/login');
    }
};

exports.isAuthor = (req, res, next) => {
    let id = req.params.id;

    Post.findById(id)
    .then(post => {
        if(post.author === req.session.user){
            return next();
        } else {
            let err = new Error('Connot find post with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};