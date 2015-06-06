/**
 * Created by vimukthiw on 12/11/14.
 */
// Retrieve
var MongoClient = require('mongodb').MongoClient;

var host='localhost';
var port=27017;

exports.connect=function(callback){
    MongoClient.connect("mongodb://"+host+":"+port+"/testdb", function(err, db) {
        if(!err) {
            var collection=db.collection('testage');
        }
        callback(collection);
    });
}

exports.getTripFromEmei=function(callback){
    MongoClient.connect("mongodb://"+host+":"+port+"/honeydb", function(err, db) {
        if(!err) {
            var collection=db.collection('imeitrip');
        }
        callback(collection);
    });
}

exports.getStationTimes=function(tripId,callback){
    MongoClient.connect("mongodb://"+host+":"+port+"/honeydb", function(err, db) {
        if(!err) {
            var obj={};
            obj['trip']=tripId;
            var collection=db.collection('stationtimes').find(obj);
        }
        callback(collection);
    });
}

exports.getData=function(tripId,callback){
    MongoClient.connect("mongodb://"+host+":"+port+"/honeydb", function(err, db) {
        if(!err) {
            var obj={};
            obj['trip']=tripId;
            var collection=db.collection('data').find(obj);
        }
        callback(collection);
    });
}
