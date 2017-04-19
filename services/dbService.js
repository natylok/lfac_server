var MongoClient = require('mongodb');
var serverUrl = 'mongodb://localhost:27017/lfac_db';

var databaseState = {
    database:null
};

exports.connect = function(done){
    if(databaseState.database) {
        return done();
    }
    MongoClient.connect(serverUrl,function(err,db){
         if(err) {
             return done(err);
         } else {
             databaseState.database = db;
             done();
         }
    });
}
exports.getDatabase = function(){
    return databaseState.database;
}

exports.addToDatabase = function(collection,data,done){
    var currentCollection = databaseState.database.collection(collection);
    currentCollection.insert(data,function(err,res){
        if (err) return done(err,false);
        return done(res,true);
    })
}   

exports.close = function(done){
    if(databaseState.database){
        databaseState.database.close(function(err,results){
            databaseState.database = null;
            done(err);
        });
    }
}
