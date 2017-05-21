var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();
var DataBaseService = require('../services/dbService');
var constantObj = require('../staticData/constants');

router.post('/gameDetails/:state', getPlayersAndClansForGame);

function getPlayersAndClansForGame(req, res) {
    if (!Global.games[req.params.state]) {
        var dataToReturn = {};
        var queryForClans = {gameId:req.body.gameId}
        DataBaseService.runFindQuery(constantObj.collectionList.CLANS, queryForClans, function(isSuccess,clanData){
            if (!isSuccess || clanData.length == 0) {
                res.setHeader('Content-Type', 'application/json');
                res.status(400).send(JSON.stringify({ "Reason": "Could not find the game of this specific state" }));
            }
            else{
                dataToReturn.clans = clanData;
                var queryForPlayers = {gameId:req.body.gameId};
                DataBaseService.runFindQuery(constantObj.collectionList.PLAYERS, queryForPlayers,handleResponseFromDB)
            }
        });
    }
    else {
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify(Global.games[req.params.state]));
    }
    function handleResponseFromDB(isSuccess, playersData) {
        if (!isSuccess || playersData.length ==0) {
            res.setHeader('Content-Type', 'application/json');
            res.status(400).send(JSON.stringify({ "Reason": "Could not find the game of this specific state" }));
        }
        else {
            dataToReturn.players = playersData;
            Global.games[req.params.state] = dataToReturn;
            res.setHeader('Content-Type', 'application/json');
            res.status(200).send(JSON.stringify(dataToReturn));
        }
    }
}

module.exports = router;