var basicMiddleWare = function(req,res,next){
    console.log("first");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
}
module.exports = basicMiddleWare;