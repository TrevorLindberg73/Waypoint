const express = require('express');
const controller = require('../controllers/socialController');
const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

router.get('/', controller.index);



//New Post
router.get('/new', controller.create);

//Detailed Post
router.get('/:id', controller.showDetailed);

//Delete Post
router.get('/:id', controller.delete)

router.get('/:id/edit', controller.update);

module.exports = router;