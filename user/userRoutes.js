var Global = require('../services/globalService');
var express = require('express');
var router = express.Router();

router.get('/',getCurrentUser );

function getCurrentUser(req,res){
    if(Global.currentUser){
        res.setHeader('Content-Type', 'application/json');
        res.status(200).send(JSON.stringify( Global.currentUser ));
    }
    else{
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ reason:"User does not connected" }));
    }
}

module.exports = router;