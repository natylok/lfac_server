var express = require('express');
var bodyParser = require('body-parser');
var cors = require('cors');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var DataBaseService = require('./services/dbService');
var basicMiddleWare = require('./middlewares/basicMiddleWare');
var authMiddleWare = require('./middlewares/authMiddleWare');
var app = express();
var globalObject = {};

app.use(basicMiddleWare);

app.use(bodyParser.json());
app.use(session({
    secret: "fd34s@!@dfa453f3DF#$D&W",
    cookie:{
        secure: false,
        httpOnly: false
    }
}));
// app.use(cors);


//All middlewares
app.use('/1', authMiddleWare);



//All routes
var loginRoutes = require('./auth/login/index');
var registerationRoutes = require('./auth/register/index.js');
var userRoutes = require('./user/userRoutes');
var gamesList = require('./games/gameList');
var gameDetails = require('./games/gameDetails');
var playerRoutes = require('./players/playerRoutes');
//Middleware function to log request protocol



app.use('/login',loginRoutes);
app.use('/register', registerationRoutes);
app.use('/1/user', userRoutes);
app.use('/games', gamesList, gameDetails);
app.use('/1/players', playerRoutes);

DataBaseService.connect(function(){
    app.listen(8877);
});

