var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();
var DataBaseService = require('../services/dbService');
var constantObj = require('../staticData/constants');

router.get('/:id', getPlayerDetails);

function getPlayerDetails(req, res) {
    if (!Global.player) {
        var query = {userId:req['id']}
        DataBaseService.runFindQuery(constantObj.collectionList.CLANS, query, handleResponseFromDB);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Global.player));
    }
    function handleResponseFromDB(isSuccess, data) {
        if (!isSuccess) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "Could not get user from database" }));
        }
        else {
            Global.games = data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(data));
        }
    }
}
module.exports = router;