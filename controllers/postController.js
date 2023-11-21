const model = require('../models/post');

exports.index = (req, res, next) => {
    model.find()
    .then(posts => res.render('./post/index', {posts}))
    .catch(err => next(err));
};

exports.new = (req, res) => {
    res.render('.post/new');
};

exports.create = (req, res, next) => {
    let post = new model(req.body);
    post.author = req.session.user;
    post.save()
    .then(post => res.redirect('/posts'))
    .catch(err => {
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
};

exports.show = (req, res, next) => {
    let id = req.params.id;

    model.findById(id).populate('author', 'firstName lastName')
    .then(post => {
        if(post) {
            return res.render('./post/show', {post});
        } else {
            let err = new Error('Cannot find a post with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err => next(err));
};

exports.edit = (req, res, next) => {
    let id = req.params.id;
    model.findById(id)
    .then(post => {return res.render('./post/edit', {post});})
    .catch(err => next(err));
};

exports.update = (req, res, next) => {
    let post = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
    .then(post => {res.redirect('/posts/' + id);})
    .catch(err => {
        if(err.name === 'ValidationError')
            err.status = 400;
        next(err);
    });
};

exports.delete = (req, res, next) => {
    let id = req.params.id;

    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(post => {res.redirect('/posts');})
    .catch(err => next(err));
};