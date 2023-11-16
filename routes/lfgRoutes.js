const express = require('express');
const lfgController = require('../controllers/lfgController');
//const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

//GET /lfg: send all groups to the user
router.get('/', lfgController.dashboard);

//GET /lfg/createGroup: send html form for creating a new group
router.get('/createGroup', lfgController.new);

//POST /groups: create a new group
router.post('/createGroup', lfgController.create);

//GET /events/:id: send details of group identified by id
router.get('/:id', lfgController.view);

// GET /lfg/:id/joinedGroup: Render details of the specific lfg chat for joining, identified by the provided ID
router.get('/:id/joinedGroup', lfgController.joinedGroup);

module.exports = router;