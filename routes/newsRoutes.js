const express = require('express');
const con = require('../controllers/newsController');

const router = express.Router();

router.get('/ufcarticle', con.showarticle);

module.exports = router;