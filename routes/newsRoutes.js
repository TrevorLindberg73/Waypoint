const express = require('express');
const controller = require('../controllers/newsController');
const router = express.Router();
const {fetchAndSaveNews} = require('../controllers/newsController');

router.get('/ufcarticle', controller.showarticle);

router.get('/', controller.index);

module.exports = router;