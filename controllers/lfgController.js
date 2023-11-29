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
    // group.size = 1;
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
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            next(err);
        }       
    })
    .catch(err=>next(err));
}

exports.joinedGroup = async (req,res,next) => {
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    try {
        const group = await model.findById(id).lean();


        if (!group) {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            return next(err);
        }

        if (group.size < group.maxSize) {
            group.size += 1;

            model.findByIdAndUpdate(id, group, { useFindAndModify: false }).populate('messages.userId', 'firstName')
            .then(group => {
                if (group){
                    res.render('./LFG/joinedGroup', { group });
                } else {
                    let err = new Error('Cannot find group with id ' + id);
                    err.status = 404;
                    next(err);
                }
            })
            .catch(err => {
                if(err.name == "ValidationError"){
                    err.status = 400;
                }
                next(err);
            });

        } else {
            let err = new Error('Group is already at maximum size');
            err.status = 403;
            next(err);
        }
    } catch (err) {
        next(err);
    }
};

exports.edit = (req, res, next)=>{
    let id = req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid group id');
        err.status = 400;
        return next(err);
    }
    model.findById(id)
    .lean()
    .then(group=>{
        if(group){
            res.render('./LFG/editGroup', {group});    
        } else {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            next(err);
        }       
    })
    .catch(err=>next(err));
}

exports.update = (req, res, next)=>{
    let group = req.body;
    let id = req.params.id;

    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid group id');
        err.status = 400;
        return next(err);
    }

    console.log(req.body);
    console.log(group);

    model.findByIdAndUpdate(id, group, {useFindAndModify: false, runValidators:true})
    .then(group=>{
        if(group){
            res.redirect("/lfg/" + id);    
        } else {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>{
        if(err.name == "ValidationError"){
            err.status = 400;
        }
        next(err);
    }); 
}

exports.delete = (req, res, next)=>{
    let id= req.params.id;
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        let err = new Error('Invalid group id');
        err.status = 400;
        return next(err);
    }

    model.findByIdAndDelete(id, {useFindANdModify: false})
    .then(group=>{
        if(group){
            res.redirect('/lfg'); 
        } else {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

exports.addMessage = async (req, res, next) => {
    const groupId = req.params.id;
    const userId = req.session.user;
    const content = req.body.content;
    console.log(userId);
    const group = await model.findById(groupId);

    if (!group) {
        const err = new Error('Group not found');
        err.status = 404;
        next(err);
    }

    group.messages.push({userId, content});

    group.save()
    .then(result => res.redirect(`/lfg/${groupId}/joinedGroup`))
    .catch(err => next(err));
}