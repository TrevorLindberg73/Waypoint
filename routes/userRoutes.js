const express = require('express');
const con = require('../controllers/userController');

const router = express.Router();

router.get('/login', con.showlog);

router.post('/login', con.loggedIn)

router.get('/register', con.showregister);

router.post('/new', con.create);

router.get('/logout', con.logout);

router.get('/profile', con.profile);

module.exports = router;