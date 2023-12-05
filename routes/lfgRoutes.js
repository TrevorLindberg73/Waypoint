const express = require('express');
const lfgController = require('../controllers/lfgController');
const {isHost, isLoggedIn} = require('../middleware/auth');
//const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

//GET /lfg: send all groups to the user
router.get('/', isLoggedIn, lfgController.dashboard);

//GET /lfg/createGroup: send html form for creating a new group
router.get('/createGroup', isLoggedIn, lfgController.new);

//POST /groups: create a new group
router.post('/', isLoggedIn, lfgController.create);

//GET /events/:id: send details of group identified by id
router.get('/:id', isLoggedIn, lfgController.view);

//GET /events/:id/edit: send html form for editing an existing group
router.get('/:id/edit', isLoggedIn, isHost,  lfgController.edit);

//PUT /events/:id: update the event identified by id
router.put('/:id', isLoggedIn, isHost,  lfgController.update);

//DELETE /lfg/:id: delete the group identified by id
router.delete('/:id', isLoggedIn, isHost,  lfgController.delete);

// GET /lfg/:id/joinedGroup: Render details of the specific lfg chat for joining, identified by the provided ID
router.get('/:id/joinedGroup', isLoggedIn, lfgController.joinedGroup);

router.post('/:id/message', isLoggedIn, lfgController.addMessage);

module.exports = router;