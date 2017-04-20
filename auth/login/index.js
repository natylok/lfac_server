var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');
var userDetails;
router.post('/', handleLoginRequest);

function handleLoginRequest(req,res){
    if(!req.body || !req.body.userName || !req.body.password){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('{"Reason" : "No details has been sent to server."}');
        return;
    }
    getDatabaseDetails(req.body.userName,req.body.password);
}

function getDatabaseDetails(userName, password) {
    var queryForDB = { "userName": userName , "password":password};
    DataBaseService.query("users", queryForDB, function (isSuccess, data) {
        handleResponseFromDB(isSuccess, data);
    })
}

function handleResponseFromDB(isSuccess,data){
    if(!isSuccess || data.length == 0){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ "Reason": JSON.stringify(data) }));
    }
    handleUserLoggedinSuccessfully(data);
}

function handleUserLoggedinSuccessfully(data){
    console.log(data);
}


module.exports = router;