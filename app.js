// Requirements
const express = require('express');
const ejs = require('ejs');
const morgan = require('morgan');
const methodOverride = require('method-override');
const mongoose = require('mongoose');
const userRoutes = require('./routes/userRoutes');
const newsRoutes = require('./routes/newsRoutes');
const socialRoutes = require('./routes/socialRoutes');
const lfgRoutes = require('./routes/lfgRoutes');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');

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
app.use(
    session({
        secret: "ajfeirf90aeu9eroejfoefj",
        resave: false,
        saveUninitialized: false,
        store: new MongoStore({mongoUrl: 'mongodb+srv://Waypoint4155:team9@waypoint.5n54op7.mongodb.net/waypoint'}),
        cookie: {maxAge: 60*60*1000}
        })
);
app.use(flash());

app.use((req, res, next) => {
    // console.log(req.session);
    res.locals.user = req.session.user || null;
    res.locals.messageUserId = req.session.user || null;
    res.locals.errorMessages = req.flash('error');
    res.locals.successMessages = req.flash('success');
    next();
});

app.use(express.static('public'));
app.use(express.urlencoded({extended: true}));
app.use(morgan('tiny'));
app.use(methodOverride('_method'));

// Set up Routes
app.get('/', (req,res) =>{
    res.redirect('/news');
});
app.use('/user', userRoutes);
app.use('/articles', newsRoutes);
app.use('/socialmedia', socialRoutes);
app.use('/lfg', lfgRoutes);
app.use('/news', newsRoutes);

app.use((req, res, next) => {
    let err = new Error('The server can not find ' + req.url);
    err.status = 404;
    next(err);
});

app.use((err, req, res, next)=>{
    console.log(err.stack);
    if(!err.status){
        err.status = 500;
        err.message = ("Internal Server Error");
    }
    res.status(err.status);
    res.render('error', {error: err});
});


// app.get('/login', (req,res) =>{
//     res.render('login');
// })