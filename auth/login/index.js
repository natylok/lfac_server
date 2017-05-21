var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');
var constantObj = require('../../staticData/constants');
var Global = require('../../services/globalService');
var userDetails;



router.post('/' , handleLoginRequest);

function handleLoginRequest(req,res){
    if(!req.body || !req.body.userName || !req.body.password){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('{"Reason" : "No details has been sent to server."}');
        return;
    }
    getDatabaseDetails(req.body.userName,req.body.password);

    function getDatabaseDetails(userName, password) {
        var queryForDB = { "userName": userName, "password": password };
        DataBaseService.runFindQuery(constantObj.collectionList.USERS, queryForDB, function (isSuccess, data) {
            handleResponseFromDB(isSuccess, data);
        });
    }

    function handleResponseFromDB(isSuccess, data) {
        if (!isSuccess || data.length == 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "User name or password are not exist" }));
        }
        else{
            handleUserLoggedinSuccessfully(data);
        }
    }

    function handleUserLoggedinSuccessfully(data) {
        setSessionCookie(data,function(){
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify({data}));
        });
    }
    /* $.ajax({ xhrFields: { withCredentials: true },type: 'POST', url: 'http://localhost:8877/login',data: JSON.stringify(d), contentType: "application/json" }).then(function (data) { console.log(data) });*/
    function setSessionCookie(data,setSuccesResponse){
        Global.currentUser = data[0];
        req.session.lfac_user = data[0];
        req.session.save(function(err){
            setSuccesResponse();
        });
    }
}



module.exports = router;