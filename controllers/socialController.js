const model = require ('../models/social');
const {fileUpload} = require('../middleware/fileUpload');

// Index
exports.index = (req,res) => {
    res.render('./social_media/index');
}
// Create
exports.create = (req,res,next) => {
    let post = new model(req.body);
    //let user = new User('User', 'User', 'email', 'password');

    //post.user = user;
    post.save()
    .then((post)=>res.redirect('/socialmedia'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err);
    });
}

// Show create form
exports.showNewPost = (req,res,next) =>{
    res.render('./social_media/newform');
}

// Shows a certain post
exports.showDetailed = (req, res) =>{
    let id = req.params.id;

    model.findById(id)
    .then(post=>{if (post) {
            return res.render('./social_media/post_detailed', {post});
        } else {
            let err = new Error('Cannot find a event with id ' + id);
            err.status = 404;
            next(err);
    }})
        .catch(err=>next(err));
};

exports.edit = (req,res,next) =>{
    let id = req.params.id;

    model.findById(id)
    .then(post=>{return res.render('./social_media/editform', {post})})
    .catch(err=>next(err));
}

exports.update = (req,res,next) =>{
    res.render('./social_media/editform');
}

exports.delete = (req, res, next) =>{
    res.render('./social_media/index');
}