const model = require ('../models/social');
const User = require('../models/user'); 
const {fileUpload} = require('../middleware/fileUpload');

// Index
// exports.index = (req,res) => {
//     model.find().then(posts=>{        
//         res.render('./social_media/index', {posts})}).catch(err=>next(err));
// }

exports.index = (req,res) => {
    let id = req.session.user;
    Promise.all([User.findById(id), model.find()])
    .then(([user, posts]) => {
        res.render('./social_media/index', { user, posts});
    })
    .catch(err => next(err));
}
// Create
exports.create = (req,res,next) => {
    let post = new model(req.body);
    
    post.user = req.session.user;
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

// exports.edit = (req,res,next) =>{
//     let id = req.params.id;

//     model.findById(id)
//     .then(post=>{return res.render('./social_media/editform', {post})})
//     .catch(err=>next(err));
// }

exports.edit = (req, res, next) => {
    let id = req.params.id;
    let userId = req.session.user;

    model.findById(id)
        .lean()
        .then(post => {
            if (post) {
                // Check if the user is logged in
                if (userId) {
                    User.findById(userId)
                        .then(user => {
                            res.render('./social_media/editform', { post, user });
                        })
                        .catch(err=>next(err));
                } else {
                    // If not logged in, render the edit event template without user information
                    res.render('./social_media/editform', { post });
                }
            } else {
                let err = new Error('Cannot find post with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// exports.update = (req,res,next) =>{

//     let post = req.body;
//     let id = req.params.id;

//     model.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
//     .then(post=>{res.redirect('/social_media/'+id)})
//     .catch(err=>{
//         if(err.name === 'ValidationError') {
//             err.status = 400;
//         }
//         next(err)
//     });
// }

exports.update = (req,res,next) =>{

    let post = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
    .then(post=>{res.redirect('/user/profile')})
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
}

// exports.delete = (req, res, next) =>{
//     let id = req.params.id;
    
//     model.findByIdAndDelete(id, {useFindAndModify: false})
//     .then(post=>{res.redirect('/social_media')})
//     .catch(err=>next(err));
// }

exports.delete = (req, res, next) =>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(post=>{res.redirect('/user/profile')})
    .catch(err=>next(err));
}