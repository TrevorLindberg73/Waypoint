const express = require('express');
const lfgController = require('../controllers/lfgController');
const {fileUpload} = require ('../middleware/fileUpload');

const router = express.Router();

router.get('/', lfgController.dashboard);

router.get('/createGroup', lfgController.create);

router.get('/viewGroup', lfgController.view);

module.exports = router;