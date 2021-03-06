var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();
var DataBaseService = require('../services/dbService');
var constantObj = require('../staticData/constants');

router.get('/list', getGameList);

function getGameList(req,res){
    if(!Global.gameList){
        DataBaseService.runFindQuery(constantObj.collectionList.GAMES, {}, handleResponseFromDB);
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Global.gameList));
    }
    function handleResponseFromDB(isSuccess,data){
        if (!isSuccess || data.length == 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "User name or password are not exist" }));
        }
        else {
            Global.gameList = data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(data));
        }
    }
}
module.exports = router;