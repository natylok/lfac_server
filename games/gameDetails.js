var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();
var DataBaseService = require('../services/dbService');
var constantObj = require('../staticData/constants');

router.post('/gameDetails', getGameDetails);

function getGameDetails(req, res) {
    if (!Global.games[req.body.state]) {
        DataBaseService.query(constantObj.collectionList.GAMES, {}, handleResponseFromDB);
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Global.games));
    }
    function handleResponseFromDB(isSuccess, data) {
        if (!isSuccess || data.length == 0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "User name or password are not exist" }));
        }
        else {
            Global.games = data;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(data));
        }
    }
}
module.exports = router;