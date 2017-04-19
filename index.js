var express = require('express');
var DataBaseService = require('./services/dbService');
var app = express();



//All middlewares
var basicMiddleWare = require('./middlewares/basicMiddleWare')

//All routes
var loginRoutes = require('./auth/login/index');
var registerationRoutes = require('./auth/register/index.js');
//Middleware function to log request protocol

app.use(basicMiddleWare);
app.use('/login',loginRoutes);
app.use('/register', registerationRoutes)


DataBaseService.connect(function(){
    app.listen(8877);
});

