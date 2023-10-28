const express = require('express');
const ejs = require('ejs');

const app = express();
let port = 3000;
let host = 'localhost';
app.set('view engine', 'ejs');

//mount middleware
app.use(express.static('public'));

app.get('/', (req,res) =>{
    res.render('index');
})

app.get('/login', (req,res) =>{
    res.render('login');
})


app.listen(port, host, () =>{
    console.log('The server is running at port ', port);
});