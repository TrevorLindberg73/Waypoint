const Group = require('../models/group');
const User = require('../models/user'); 

//check if user is hostname of the story
exports.isHost = (req, res, next)=>{
        let id = req.params.id;

        if(!id.match(/^[0-9a-fA-F]{24}$/)){
            let err = new Error('Invalid group id');
            err.status = 400;
            return next(err);
        }
        
        Group.findById(id)
        .then(group=>{
            if(group){
                if(group.hostName == req.session.user){
                    return next();
                }else{
                    let err = new Error('Unauthorized to access the resource');
                    err.status = 401;
                    return next(err);
                } 
            } else {
                let err = new Error('Cannot find a event with id ' + id);
                err.status = 404;
                next(err);
            }    
        })
        .catch(err=>next(err));
};

// User has not logged in
exports.isGuest = (req, res, next) => {
    if (!req.session.user) next();
    else {
        //req.flash('error', 'You are already logged in');
        res.redirect('/socialmedia/index');
    }
};

// User has logged in
exports.isLoggedIn = (req, res, next) => {
    if (req.session.user) next();
    else {
        //req.flash('error', 'You have not logged in yet');
        res.redirect('/user/login');
    }
};