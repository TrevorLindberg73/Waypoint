// Requirements
const express = require('express');
const ejs = require('ejs');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const socialRoutes = require('./routes/socialRoutes');

// Create App
const app = express();

// Configure App
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//Database

//mount middleware
app.use(express.static('public'));

// Set up Routes
app.get('/', (req,res) =>{
    res.render('index');
})
app.use('/users', userRoutes);
app.use('/articles', newsRoutes);
app.use('/socialmedia', socialRoutes);

// app.get('/login', (req,res) =>{
//     res.render('login');
// })


app.listen(port, host, () =>{
    console.log('The server is running at port ', port);
});