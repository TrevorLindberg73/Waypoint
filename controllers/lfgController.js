const model = require('../models/group');

exports.dashboard = (req, res, next) => {
    model.find()
        .then((groups) => {
            res.render('./LFG/LFG_dashboard', {groups});
            // let categories = groups.map((group) => group.category);
            // let sortCategories = [...new Set(categories)];
            // res.render('./LFG/LFG_dashboard', { groups, categories: sortCategories });
        })
        .catch(err => next(err));
}


exports.new = (req,res) => {
    res.render('./LFG/createGroup');
}

exports.create = (req, res, next) => {
    let group = new model(req.body);//create a new event document
    console.log(req.body);
    group.save()//insert the document to the database
    .then(group=> res.redirect('/lfg'))
    .catch(err=>{
        if(err.name == "ValidationError"){
            err.status = 400;
        }
        next(err);
    }); 
}

exports.view = (req, res, next)=>{
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .lean()
    .then(group=>{
        if(group){
            res.render('./LFG/viewGroup', {group});
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }       
    })
    .catch(err=>next(err));
}

exports.joinedGroup = (req,res) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .lean()
    .then(group=>{
        if(group){
            res.render('./LFG/joinedGroup', {group});
        } else {
            let err = new Error('Cannot find event with id ' + id);
            err.status = 404;
            next(err);
        }       
    })
    .catch(err=>next(err));
}