const model = require ('../models/social');
const {fileUpload} = require('../middleware/fileUpload');

exports.index = (req,res) => {
    res.render('./social_media/index');
}

exports.showDetailed = (req, res) =>{
    res.render('./social_media/post_detailed');
}

exports.create = (req,res,next) =>{
    res.render('./social_media/newform');
}

exports.update = (req,res,next) =>{
    res.render('./social_media/editform');
}

exports.delete = (req, res, next) =>{
    res.render('./social_media/index');
}