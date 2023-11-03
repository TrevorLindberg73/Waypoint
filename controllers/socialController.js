const model = require ('../models/social');
const {fileUpload} = require('../middleware/fileUpload');

exports.index = (req,res) => {
    res.render('./social_media/index');
}

exports.showDetailed = (req, res) =>{
    res.render('./social_media/post_detailed');
}