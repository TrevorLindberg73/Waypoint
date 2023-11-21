const mongoose = require('mongoose');

exports.validateId = (req, res, next) => {
    let id = req.params.id;

    if(mongoose.Types.ObjectId.isValid(id)){
        return next();
    } else {
        let err = new Error('Invalid Object ID');
        err.status = 400;
        next(err);
    }
};