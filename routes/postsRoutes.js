const express = require('express');
const con = require('../controllers/postController');
const {isLoggedIn, isAuthor} = require('../middleware/auth');
const {validateId} = require('../middleware/validator');

const router = express.Router();

//Get /posts/new: Html form for creating a new post
router.get('/new', isLoggedIn, con.new);

//GET /posts: create a new post
router.post('/', isLoggedIn, con.create);

//GET /posts/:id: send post with ID
router.get('/:id', validateId, con.show);

//GET /posts/:id/edit: HTML form for editing post
router.get('/:id/edit', isLoggedIn, isAuthor, validateId, con.edit);

//PUT /posts/:id: Update Post
router.put('/:id', isLoggedIn, isAuthor, validateId, con.update);

//DELETE /posts/:id: Deletes post with id
router.delete('/:id', isLoggedIn, isAuthor, validateId, con.delete);

module.exports = router;