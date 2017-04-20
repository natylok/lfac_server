var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');
router.post('/', handleRegisterationRequest);

function handleRegisterationRequest(req,res){
    if(!req.body.userName || !req.body.password || !req.body.fullName){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('{"Reason" : "Data is missing"}');        
    }
    addDataToDB(req.body);
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