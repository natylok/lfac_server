var authMiddleWare = function (req, res, next) {
    var OPTIONS = 'OPTIONS';
    if (req.method != OPTIONS && (!req.session || !req.session.lfac_user )){
        res.setHeader('Content-Type', 'application/json');
        res.status(400).send(JSON.stringify({ "Reason": "User is not connected" }));
    }
    else{
        next();
    }
}
module.exports = authMiddleWare;