const express = require('express');
const con = require('../controllers/userController');

const router = express.Router();

router.get('/login', con.showlog);

router.get('/register', con.showregister);

router.post('/', con.create);

module.exports = router;