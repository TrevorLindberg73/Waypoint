const express = require('express');
const con = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); // This sets the destination folder for uploaded files


const router = express.Router();

router.get('/login', con.showlog);

router.post('/login', con.loggedIn)

router.get('/register', con.showregister);

router.post('/new', con.create);

router.get('/logout', con.logout);

router.get('/profile', con.profile);

router.post('/upload-profile-picture', upload.single('profilePicture'), con.uploadProfilePicture);


module.exports = router;