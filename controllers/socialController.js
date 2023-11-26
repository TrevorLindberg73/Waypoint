const model = require ('../models/social');
const {fileUpload} = require('../middleware/fileUpload');

exports.index = (req,res) => {
    res.render('./social_media/index');
}

exports.create = (req,res,next) => {
    
}

exports.showNewPost = (req,res,next) =>{
    res.render('./social_media/newform');
}

exports.showDetailed = (req, res) =>{
    res.render('./social_media/post_detailed');
}

exports.update = (req,res,next) =>{
    res.render('./social_media/editform');
}

exports.delete = (req, res, next) =>{
    res.render('./social_media/index');
}