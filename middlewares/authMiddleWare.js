var authMiddleWare = function (req, res, next) {
    if (!req.session || !req.session.lfac_user){
        console.log("a");
    }
}
module.exports = authMiddleWare;