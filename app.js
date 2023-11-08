// Requirements
const express = require('express');
const ejs = require('ejs');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const socialRoutes = require('./routes/socialRoutes');
const lfgRoutes = require('./routes/lfgRoutes');

// Create App
const app = express();

// Configure App
let port = 3000;
let host = 'localhost';
let url = 'mongodb+srv://Waypoint4155:team9@waypoint.5n54op7.mongodb.net/waypoint'
app.set('view engine', 'ejs');

//Database
mongoose.connect(url)
.then(() => {
    app.listen(port, host, () => {
        console.log('Server is running on port ', port);
    });
})
.catch(err => console.log(err.message));

//mount middleware
app.use(express.static('public'));

// Set up Routes
app.get('/', (req,res) =>{
    res.render('index');
})
app.use('/users', userRoutes);
app.use('/articles', newsRoutes);
app.use('/socialmedia', socialRoutes);
app.use('/lfg', lfgRoutes);

// app.get('/login', (req,res) =>{
//     res.render('login');
// })