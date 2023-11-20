const express = require('express');
const lfgController = require('../controllers/lfgController');
//const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

//GET /lfg: send all groups to the user
router.get('/', lfgController.dashboard);

//GET /lfg/createGroup: send html form for creating a new group
router.get('/createGroup', lfgController.new);

//POST /groups: create a new group
router.post('/', lfgController.create);

//GET /events/:id: send details of group identified by id
router.get('/:id', lfgController.view);

//GET /events/:id/edit: send html form for editing an existing group
router.get('/:id/edit', lfgController.edit);

//PUT /events/:id: update the event identified by id
router.put('/:id', lfgController.update);

//DELETE /lfg/:id: delete the group identified by id
router.delete('/:id', lfgController.delete);

// GET /lfg/:id/joinedGroup: Render details of the specific lfg chat for joining, identified by the provided ID
router.get('/:id/joinedGroup', lfgController.joinedGroup);

module.exports = router;