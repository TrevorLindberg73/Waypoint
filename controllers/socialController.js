const model = require ('../models/social');
const User = require('../models/user'); 
const {fileUpload} = require('../middleware/fileUpload');

// Shows the main social page
exports.index = (req,res) => {
    let id = req.session.user;
    Promise.all([User.findById(id), model.find()])
    .then(([user, posts]) => {
        res.render('./social_media/index', { user, posts});
    })
    .catch(err => next(err));
}
// Create
exports.create = async (req, res, next) => {
    const { title, content } = req.body;
    const userId = req.session.user;

    try {
        const user = await User.findById(userId);

        if (!user) {
            // Handle the case where the user is not found
            return res.status(404).send('User not found');
        }

        const post = new model({
            title,
            content,
            user: userId,
            author: `${user.firstName} ${user.lastName}`, // Combine firstName and lastName
        });

        await post.save();
        res.redirect('/socialmedia');
    } catch (err) {
        next(err);
    }
};

// Show create form
exports.showNewPost = (req,res,next) =>{
    res.render('./social_media/newform');
}

// Shows a certain post
exports.showDetailed = (req, res, next) => {
    let id = req.params.id;

    model.findById(id)
        .populate('comments.user', 'username')  // Populate the 'user' field within the 'comments' array
        .then(post => {
            if (post) {
                return res.render('./social_media/post_detailed', { post });
            } else {
                let err = new Error('Cannot find a post with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};

// Takes user to the edit form
exports.edit = (req, res, next) => {
    let id = req.params.id;
    let userId = req.session.user;

    model.findById(id)
        .lean()
        .then(post => {
            if (post) {
                // Check if the user is logged in
                if (userId) {
                    User.findById(userId)
                        .then(user => {
                            res.render('./social_media/editform', { post, user });
                        })
                        .catch(err=>next(err));
                } else {
                    // If not logged in, render the edit event template without user information
                    res.render('./social_media/editform', { post });
                }
            } else {
                let err = new Error('Cannot find post with id ' + id);
                err.status = 404;
                next(err);
            }
        })
        .catch(err => next(err));
};


// Updates the post with users new info
exports.update = (req,res,next) =>{

    let post = req.body;
    let id = req.params.id;

    model.findByIdAndUpdate(id, post, {useFindAndModify: false, runValidators: true})
    .then(post=>{res.redirect('/user/profile')})
    .catch(err=>{
        if(err.name === 'ValidationError') {
            err.status = 400;
        }
        next(err)
    });
}


// Deletes a post
exports.delete = (req, res, next) =>{
    let id = req.params.id;
    
    model.findByIdAndDelete(id, {useFindAndModify: false})
    .then(post=>{res.redirect('/socialmedia')})
    .catch(err=>next(err));
}

// Allows comments to be added to posts
exports.addComment = async (req, res, next) => {
    const postId = req.params.id;
    const { text } = req.body;
    const userId = req.session.user;

    try {
        const post = await model.findById(postId).populate('comments.user');
        const user = await User.findById(userId); // Fetch the user details
        console.log(user);
        const newComment = {
            user: {
                _id: user._id,
            },
            text,
            firstName: user.firstName,
            lastName: user.lastName,
        };

        post.comments.push(newComment);
        const updatedPost = await post.save();

        // Assuming you want to send the updated post with comments back to the client
        res.redirect(`/socialmedia/${postId}`); // Redirect to the detailed post page
    } catch (err) {
        next(err);
    }
};

// Tracks how many likes a post has
exports.toggleLike = async (req, res, next) => {
    const postId = req.params.id;
    const userId = req.session.user;

    try {
        const post = await model.findById(postId);

        // Check if the user already liked the post
        const likedIndex = post.likes.indexOf(userId);

        if (likedIndex === -1) {
            // If not liked, add user to likes
            post.likes.push(userId);
        } else {
            // If already liked, remove user from likes
            post.likes.splice(likedIndex, 1);
        }

        const updatedPost = await post.save();

        // Redirect to the detailed post page
        res.redirect(`/socialmedia/${postId}`);
    } catch (err) {
        next(err);
    }
};