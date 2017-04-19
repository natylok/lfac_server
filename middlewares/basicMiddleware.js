var basicMiddleWare = function(req,res,next){
    console.log("first");
    next();
}
module.exports = basicMiddleWare;