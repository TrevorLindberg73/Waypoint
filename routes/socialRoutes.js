const express = require('express');
const controller = require('../controllers/socialController');
const {fileUpload} = require ('../middleware/fileUpload');
const {isLoggedIn, isHostSocial} = require('../middleware/auth');

const router = express.Router();

//GET /socialmedia: send all events to user
router.get('/', controller.index);

//GET /socialmedia/new: send html form for creating new post
router.get('/new', isLoggedIn, controller.showNewPost);

//GET /socialmedia: creates new post
router.post('/', isLoggedIn, controller.create);

//GET /socialmedia/:id: send post to user by ID
router.get('/:id', controller.showDetailed);

//GET /socialmedia/:id/edit: send html form for editing
router.get('/:id/edit', isLoggedIn, isHostSocial, controller.edit);

//PUT /socialmedia/:id: update post by ID
router.put('/:id', isLoggedIn, controller.update);

//DELETE /socialmedia/:id: deletes post by ID
router.delete('/:id', isLoggedIn, isHostSocial, controller.delete)

//router.get('/:id/edit', isLoggedIn, controller.edit);

module.exports = router;