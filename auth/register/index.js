var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');
router.get('/', function (req, res) {
    data = {_id:"gas",userName:"nati"};
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
});
module.exports = router;