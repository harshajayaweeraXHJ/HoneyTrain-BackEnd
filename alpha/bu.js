/**
 * Created by vimukthiw on 12/17/14.
 */

var that;
var i;

var db = require("../model/mongoDBhandler");

var Trip = function (_tripId) {
    this.stationReachingTimes = [];
    that=this;
    i=0;
};

function load(_tripId,callback){
    db.getStationTimes(_tripId,function(collection){

        collection.toArray(function(err, items) {
            that.stationReachingTimes=items;
            callback();

        });
    });

}

Trip.prototype.loadData=function(){
    load(this.tripId,function(){
        console.log('from trip that',that.stationReachingTimes);
        console.log('from trip this',this.stationReachingTimes);
        console.log('loggint this',this);
    });
};
c
module.exports = Trip;
