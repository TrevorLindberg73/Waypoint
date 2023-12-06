const model = require('../models/group');
const User = require('../models/user'); 

//rendering the dashboard
exports.dashboard = (req, res, next) => {
    // Extract the user ID from the session
    let userId = req.session.user;

    // Use Promise.all to fetch both user and groups in parallel
    Promise.all([User.findById(userId), model.find()])
        .then(([user, groups]) => {
            // Render the dashboard view with user and groups data
            res.render('./LFG/LFG_dashboard', { user, groups });
        })
        .catch(err => next(err));
};

//Rendering the 'createGroup' view
exports.new = (req,res) => {
    res.render('./LFG/createGroup');
}

// Controller function for handling the creation of a new group
exports.create = (req, res, next) => {
    let group = new model(req.body);//create a new event document
    group.hostName = req.session.user; // Set the hostName property of the group to the current user's session user ID
    console.log(req.body);
    group.save()//insert the document to the database
    .then(group=> res.redirect('/lfg')) // Redirect to the LFG page after successful creation
    .catch(err=>{
         // Handle validation errors and pass other errors to the error handling middleware
        if(err.name == "ValidationError"){
            err.status = 400;
        }
        next(err);
    }); 
}

// Controller function for rendering the view of a specific group
exports.view = (req, res, next)=>{
    // Extract the group ID from the request parameters
    let id = req.params.id;
    //an objectId is a 24-bit Hex string
    if(!id.match(/^[0-9a-fA-F]{24}$/)){
        // If not valid, create and handle a 400 Bad Request error
        let err = new Error('Invalid event id');
        err.status = 400;
        return next(err);
    }
    // Find the group by ID, populate the 'hostName' reference field with 'firstName' and 'lastName'
    model.findById(id).populate('hostName', 'firstName lastName') 
    .lean()
    .then(group=>{
        if(group){
            // If the group is found, render the 'viewGroup' view
            console.log(group);
            res.render('./LFG/viewGroup', {group});
        } else {
            // If the group is not found, create and handle a 404 Not Found error
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
        // Find the group by ID
        const group = await model.findById(id).lean();

        // Check if the group is not found
        if (!group) {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            return next(err);
        }
            // Update the group, populate 'messages.userId' with 'firstName'
            model.findByIdAndUpdate(id, group, { useFindAndModify: false }).populate('messages.userId', 'firstName')
            .then(group => {
                if (group){
                    // If the group is found, render the 'joinedGroup' view with the updated group
                    res.render('./LFG/joinedGroup', { group });
                } else {
                    // If the group is not found, create and handle a 404 Not Found error
                    let err = new Error('Cannot find group with id ' + id);
                    err.status = 404;
                    next(err);
                }
            })
            .catch(err => {
                 // Handle validation errors and pass other errors to the error handling middleware
                if(err.name == "ValidationError"){
                    err.status = 400;
                }
                next(err);
            });
    } catch (err) {
        next(err);
    }
};

//rendering the 'editGroup' view with group data
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

// Updating a specific group
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

//Deleting a specific group
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
            // If the group is found and deleted, redirect to the LFG page
            res.redirect('/lfg'); 
        } else {
            let err = new Error('Cannot find group with id ' + id);
            err.status = 404;
            next(err);
        }
    })
    .catch(err=>next(err));
}

//Function for adding a message to a specific group
exports.addMessage = async (req, res, next) => {
    const groupId = req.params.id;
    const userId = req.session.user;
    const content = req.body.content;
    console.log(userId);
    const group = await model.findById(groupId);

    // Check if the group is not found
    if (!group) {
        const err = new Error('Group not found');
        err.status = 404;
        next(err);
    }

    // Add a new message to the group's messages array
    group.messages.push({userId, content});

    // Save the updated group to the database
    group.save()
    .then(result => res.redirect(`/lfg/${groupId}/joinedGroup`)) // Redirect to the joinedGroup view
    .catch(err => next(err));
}