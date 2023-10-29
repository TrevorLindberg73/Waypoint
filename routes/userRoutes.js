const express = require('express');
const con = require('../controllers/userController');

const router = express.Router();

router.get('/login', con.showlog);

module.exports = router;