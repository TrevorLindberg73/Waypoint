const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        cb(null,'./public/images')
    },
    filename: (req,file,cb) =>{
        const uniqueSiffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSiffix + path.extname(file.originalname));
    }
});

const fileFilter = (req, file, cb) => {
    const mimeType = ['.jpeg', 'inputImage/png' , 'inputImage/gif', '.jpg'];
    if(mimeType.includes(file.mimeType)){
        return cb(null,true);
    }else{
        cb(new Error('Invalide file type. Only jpeg, jpg, png, and gif images are allowed'));
    }
}

const upload = multer({
    storage: storage,
    limits: {fileSize: 1*1024*1024},
}).single('inputImage');

exports.fileUpload = (req, res, next) =>{
    upload(req,res,err => {
        if(err) {
            err.status=400;
            next(err);
        }else{
            next();
        }
    });
}