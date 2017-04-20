var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');


router.post('/',function(req,res){
    if(!req.body || !req.body.userName || !req.body.password ){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send('{"Reason" : "No details has been sent to server."}');
        return;
    }
    handleLoginRequest(req.body.userName,req.body.password,function(isSuccess){
        
    });
    
});
function handleLoginRequest(userName,password,next){
    var queryForDB = {"userName":userName};
    DataBaseService.query("users",queryForDB,function(data){
       console.log(data); 
    })
}
module.exports = router;