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

// router.get('/viewGroup', lfgController.view);

module.exports = router;