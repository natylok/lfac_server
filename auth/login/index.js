var express = require('express');
var router = express.Router();
var DataBaseService = require('../../services/dbService');


router.get('/',function(req,res){
    console.log("user logged in");
    console.log(DataBaseService.getDatabase());
});
module.exports = router;