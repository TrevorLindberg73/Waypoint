const express = require('express');
const controller = require('../controllers/socialController');
const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

router.get('/', controller.index);

router.get('/:id', controller.showDetailed);

//New Post

//Detailed Post

//Delete Post

module.exports = router;