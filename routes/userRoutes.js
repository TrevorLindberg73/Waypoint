const express = require('express');
const con = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middleware/auth');

const router = express.Router();

router.get('/login', con.showlog);

router.post('/login', con.loggedIn)

router.get('/register', con.showregister);

router.post('/new', con.create);

router.get('/profile', isLoggedIn, con.showprofile);

module.exports = router;