var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');
var constantObj = require('../../staticData/constants');
router.post('/', handleRegisterationRequest);

function handleRegisterationRequest(req,res){
    if(isDataMissing(req.body)){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('{"Reason" : "Data is missing"}');       
        return; 
    }
    addDataToDB(req.body);
    function addDataToDB(data) {
        verifyUserDoesNotExist(data.userName,data.email, function (isUserExist) {
            if (isUserExist) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send('{"Reason" : "User or email is already exist"}');
            }
            else{
                var dataAsJson = buildJsonForRegisteration(data);
                DataBaseService.addToDatabase(constantObj.collectionList.USERS, dataAsJson, handleResponseFromServer,true);
            }
        }); 
    }
    function verifyUserDoesNotExist(userName,email,addData){
        var jsonForQuery = {$or : [{userName:userName},{email:email}]};
        DataBaseService.query(constantObj.collectionList.USERS, jsonForQuery,function(isSuccess,data){
            if (isSuccess){
                return addData(data && data.length != 0);
            }
            else{
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send('{"Reason" : "Could not query the data base for registeration"}');
            } 
            
        });
    }
    function handleResponseFromServer(data, isSuccess) {
        if (!isSuccess) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send('{"reason" : "Could not add data to the data base"}');
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send('{"results":"User has been registered successfully"}' );
        }
    }


    function buildJsonForRegisteration(data) {
        return {
            userName: data.userName,
            password: data.password,
            fullName: data.fullName,
            email: data.email
        };
    }

    function isDataMissing(data) {
        return (!data || !data.userName || !data.password || !data.fullName || !data.email);
    }
}

/*function (req, res) {
    data = {_id:"mmmmmmmmmmm",userName:"nati"};
    DataBaseService.addToDatabase("users",data,function(response,success){
        if (success){
            res.set('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(response));
        }
        else{
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send('{"Reason" : "Could not add the value , please take a look"}');
        }

    });
});*/
module.exports = router;