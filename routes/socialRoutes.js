const express = require('express');
const controller = require('../controllers/socialController');
const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

//GET /socialmedia: send all events to user
router.get('/', controller.index);

//GET /socialmedia/new: send html form for creating new post
router.get('/new', controller.showNewPost);

//GET /socialmedia: creates new post
router.post('/', controller.create);

//GET /socialmedia/:id: send post to user by ID
router.get('/:id', controller.showDetailed);

//GET /socialmedia/:id/edit: send html form for editing
router.get('/:id/edit', controller.edit);

//PUT /socialmedia/:id: update post by ID
router.put('/:id', controller.update);

//DELETE /socialmedia/:id: deletes post by ID
router.delete('/:id', controller.delete)

router.get('/:id/post_detailed', controller.showDetailed);

router.post('/:id/comment', controller.addComment);

router.post('/:id/like', controller.toggleLike);

module.exports = router;