// Requirements
const express = require('express');
const ejs = require('ejs');
const userRoutes = require('./routes/userRoutes');

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
app.use('/user', userRoutes);

// app.get('/login', (req,res) =>{
//     res.render('login');
// })


app.listen(port, host, () =>{
    console.log('The server is running at port ', port);
});