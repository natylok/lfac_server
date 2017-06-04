var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();
var DataBaseService = require('../services/dbService');
var constantObj = require('../staticData/constants');

router.post('/:gameState/createProfile', createPlayerProfile);

function createPlayerProfile(req, res) {
    if (!isDataMissing()){
        DataBaseService.addToDatabase(constantObj.collectionList.PLAYERS, req.body.data, handleResponseFromDB);
    } else {
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ "Reason": "one of the details are missing" }));        
    }

    function isDataMissing(){
        for (item in req.body.data){
            if (!item){
                return true;
            }
        }
        return false; 
    }
    function handleResponseFromDB(isSuccess, playerData) {
        if (!isSuccess) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "Could not create a player" }));
        }
        else {
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(req.body.data));
        }
    }
}

module.exports = router;