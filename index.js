var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var DataBaseService = require('./services/dbService');
var basicMiddleWare = require('./middlewares/basicMiddleWare');
var app = express();
app.use(basicMiddleWare);
app.use(bodyParser.json());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));



//All middlewares




//All routes
var loginRoutes = require('./auth/login/index');
var registerationRoutes = require('./auth/register/index.js');
//Middleware function to log request protocol



app.use('/login',loginRoutes);
app.use('/register', registerationRoutes)


DataBaseService.connect(function(){
    app.listen(8877);
});

