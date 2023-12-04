const express = require('express');
const con = require('../controllers/userController');
const {isGuest, isLoggedIn} = require('../middleware/auth');

const router = express.Router();

router.get('/login', isGuest, con.showlog);

router.post('/login', isGuest, con.loggedIn)

router.get('/register', isGuest, con.showregister);

router.post('/new', isGuest, con.create);

router.get('/logout', isLoggedIn, con.logout);

module.exports = router;