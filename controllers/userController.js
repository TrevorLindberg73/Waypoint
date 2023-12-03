const user = require('../models/user');
const model = require('../models/user');
const socials = require('../models/social');
const socials = require('../models/social');

// GET /user/login: Render the login page
exports.showlog = (req, res, next) => {
    res.render('./user/login');
}

// GET /user/register: Render the register page
exports.showregister = (req, res, next) => {
    res.render('./user/register');
}

// GET /user/profile: Render the profile page of a user
exports.profile = (req, res, next)=>{
    let id = req.session.user;
    Promise.all([model.findById(id), socials.find({author: id})])
    .then(results =>{
        const [user, posts] = results;
        res.render('./user/profile', {user, posts})
    })
    .catch(err=>next(err));
};

exports.loggedIn = (req, res, next) => {
    let email = req.body.email;
    let password = req.body.password;

    console.log(email);
    console.log(password);

    model.findOne({email: email})
    .then(user => {
        if (user) {
            user.comparePassword(password)
            .then(result => {
                if (result) {
                    req.session.user = user._id;
                    req.session.messageUserId = user._id;
                    req.flash('Success', 'You have successfully logged in');
                    res.redirect('/');
                } else {
                    req.flash('Error', 'Wrong Password');
                    res.redirect('/user/login');
                }
            })
            .catch(err => next(err));
        } else {
            req.flash('Error', 'Wrong Email Address');
            res.redirect('/user/login');
        }
    })
    .catch(err => next(err));
}

exports.create = (req, res, next) => {
    // let errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     errors.array().forEach(error=>{
    //         req.flash('error', error.msg);
    //     });
    //     res.redirect('back');
    // }
    let user = new model(req.body);
    console.log(req.body);
    if (user.email) user.email = user.email.toLowerCase();
    user.save()
    .then((user)=>res.redirect('/user/login'))
    .catch(err=>{
        if(err.name === 'ValidationError') {
            req.flash('error', err.message);
            res.redirect('/user/new');
        }
        if (err.code === 11000) {
            req.flash('error', 'That email has been taken');
            res.redirect('/user/new');
        }
        next(err);
    });
    
};

exports.logout = (req, res, next) => {
    req.session.destroy(err=>{
        if(err) 
           return next(err);
       else
            res.redirect('/');  
    });
}