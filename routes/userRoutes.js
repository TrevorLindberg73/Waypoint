const express = require('express');
const con = require('../controllers/userController');
const multer = require('multer');
const upload = multer({ dest: 'public/uploads/' }); // This sets the destination folder for uploaded files


const router = express.Router();

// GET /user/login: Render the login page
router.get('/login', con.showlog);

// POST: Logs user in
router.post('/login', con.loggedIn)

// GET /user/register: Shows register page
router.get('/register', con.showregister);

// POST: Registers a new user
router.post('/new', con.create);

// GET /user/logout: Logs out user
router.get('/logout', con.logout);

// GET /user/profile: Takes user to the profile page
router.get('/profile', con.profile);

router.post('/upload-profile-picture', upload.single('profilePicture'), con.uploadProfilePicture);


module.exports = router;