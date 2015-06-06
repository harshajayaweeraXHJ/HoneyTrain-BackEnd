/**
 * Created by vimukthiw on 12/11/14.
 */
// Retrieve
var MongoClient = require('mongodb').MongoClient;
/*MongoClient.connect("mongodb://localhost:27017/testdb", function(err, db) {
    if(!err) {
        console.log("We are connected");

        var collection=db.collection('testage');
        collection.find().toArray(function(err, items) {
            console.log(items[0].name);
            console.log(items[1].name);
            console.log(null);
            db.close();



        });

    }
});*/

exports.connect=function(callback){
    MongoClient.connect("mongodb://localhost:27017/testdb", function(err, db) {
        if(!err) {
            console.log("We are connected");
            var collection=db.collection('testage');

        }
        callback(collection);
    });
}
