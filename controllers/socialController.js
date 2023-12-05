const model = require ('../models/social');
const {fileUpload} = require('../middleware/fileUpload');



// Index
exports.index = (req,res) => {
    model.find().then(posts=>{        
        res.render('./social_media/index', {posts})}).catch(err=>next(err));
    
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

exports.edit = (req,res,next) =>{
    let id = req.params.id;

    model.findById(id)
    .then(post=>{return res.render('./social_media/editform', {post})})
    .catch(err=>next(err));
}

exports.update = (req,res,next) =>{

    let post = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
    .then(post=>{res.redirect('/socialmedia/'+id)})
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
}

exports.delete = (req, res, next) =>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(post=>{res.redirect('/socialmedia')})
    .catch(err=>next(err));
}