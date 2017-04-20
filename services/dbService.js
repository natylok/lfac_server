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
        return err ? done(err,false) : done(res,true);
    })
}   
exports.query = function(collection,query,next){
    var currentCollection = databaseState.database.collection(collection);
    currentCollection.find(query).toArray(function(err,res){
        if (err){
            return next(false,err);
        }
        return next(true,res);
    });
}

exports.close = function(done){
    if(databaseState.database){
        databaseState.database.close(function(err,results){
            databaseState.database = null;
            done(err);
        });
    }
}
