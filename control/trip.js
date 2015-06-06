var db          = require("../model/mongoDBhandler");
var Firebase    = require("firebase");
var firebaseRef = new Firebase("https://testhj.firebaseio.com/");
var async       = require("async");
var clc         = require('cli-color');
var

 Trip = function (_tripId) {
    this.tripId = _tripId;
    this.times=0;
    this.ready=false; 
    this.stationReachingTimes = [];
    this.data=[];
};

Trip.prototype.loadData=function(){
    var that=this;
    load(this.tripId,function(){
        that.times++;
        if(that.times==2)
{            that.ready=true;
            
        }
    });

    function load(_tripId,callback){
        db.getStationTimes(_tripId,function(collection){
            collection.toArray(function(err, items) {
                that.stationReachingTimes=items;
                callback();
            });
        });
        db.getData(_tripId,function(collection){
            collection.toArray(function(err, items) {
                that.data=items;
                callback();
             });
        });
    }

 };

Trip.prototype.cal=function(obj){
    var that=this;
    if(this.ready){
        var min=1000000;
        var correction=0;
        that.data.forEach(function(val,index){
            var temp=(val.lat-obj.latitude)*(val.lat-obj.latitude)+(val.lon-obj.longitude)*(val.lon-obj.longitude);
            if(min>temp) {
                min=temp;
                correction=index;
            }
        })
        obj.corrected_latitude=that.data[correction].lat;
        obj.corrected_longitude=that.data[correction].lon;
        function errorLog(err){
            console.log("Error Occured" + err);
        }
         var stationIdIndex = 0;   
         
         async.eachSeries(that.stationReachingTimes[0].times, function(val, errorLog){
                this.stationIdIndex = stationIdIndex + 1;
                     stationIdIndex++;

            var valReachTime ="";
            var RT_i = 0;
            
            async.eachSeries(val.reachtime.toString().split(""), function(charVal, errorLog){
                valReachTime = valReachTime + charVal;      
                 if (RT_i == 1 || RT_i==3) {
                    console.log(clc.red("evaluated to true"));
                     valReachTime = valReachTime + ":"
                    }   
                 RT_i++;
                 console.log(clc.red(RT_i));
                  errorLog();   
                });
            console.log("|||||||||||||||| reach time " + valReachTime + " ||||||||||||||||||");
            var dataCorrectionTime ="";
            var DT_i = 0;
            
            async.eachSeries(that.data[correction].time.toString().split(""), function(charVal, errorLog){
                dataCorrectionTime = dataCorrectionTime + charVal;      
                 if (DT_i == 1 || DT_i==3) {
                     dataCorrectionTime = dataCorrectionTime + ":"
                    }   
                 DT_i++;
                 
                  errorLog();  
                });

            var outputObj = {'station':val.station ,'start': that.stationReachingTimes[0].start, 'end':that.stationReachingTimes[0].end,'nowprev':that.data[correction].prev,'nownext':that.data[correction].next,'time': convert(valReachTime, obj.sent.getHours()+':'+obj.sent.getMinutes()+':'+obj.sent.getSeconds(), dataCorrectionTime), id:"TRN_00" + this.stationIdIndex};
                outputObj.time = outputObj.time.split(":")[0] + ":" + outputObj.time.split(":")[1]; 
                console.log("notification is ready to emit" + JSON.stringify(outputObj));
                global.io.emit('GPSServer',outputObj);
                console.log("************MESSAGE HAS BEEN EMITTED******************");
            
            errorLog();
        });


    }
    else{
        console.log('data has not finished fetching to trip: ' + that.tripId);
    }
};

function convert(x,y,z){
    console.log("$$$$$$$$$$$ FROM CONVERT: X is = " + x + ", Y is " + y +", Z is " + z + "$$$$$$$$$$$$$");
    var a=x.split(":");
    var b=y.split(":");
    var c=z.split(":");
    
    var seconds = ( ((+a[0]) * 60 * 60 + (+a[1]) * 60 + (+a[2]))    +    ((+b[0]) * 60 * 60 + (+b[1]) * 60 + (+b[2]))    -     ((+c[0]) * 60 * 60 + (+c[1]) * 60 + (+c[2]))    );
    var aS = Math.floor(seconds/3600); 
    var bS = Math.floor((seconds%3600)/60);
    var cS = seconds%60;

     if (aS.toString().length==1){
        aS = "0" + aS.toString();
     }
     if (bS.toString().length==1){
        bS = "0" + bS.toString();
     }
     if (cS.toString().length==1){
        cS = "0" + cS.toString();
     } 

    return (aS + ':' + bS + ':'+ cS);
}


module.exports = Trip;