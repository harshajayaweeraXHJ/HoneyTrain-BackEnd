/**
 * Created by vimukthiw on 12/20/14.
 */
var async = require('async')
var toObj=require('../control/stringToJSON');
var trip=require('../control/trip');
var db=require('../model/mongoDBhandler');


var arr=[];
var tripdata=[];
var ready=false;

// Error callbacks...............................

 function errorCallback(err){ 
    console.log("ERR: " + err);
  };

// Error callbacks...............................

exports.direct=function(data){
    if(ready){
        var obj=toObj.convert(data); //converted data
        var numtime=(obj.sent.getHours()*100) + (obj.sent.getMinutes()); //time into numerical format

        var filobj = tripdata.filter(function(element){
                      console.log("bool value: " + (element.imei==obj.imei)&&(element.starting<numtime)&&(numtime<element.ending));          
                      return (element.imei==obj.imei)&&(element.starting<numtime)&&(numtime<element.ending);
                      });

        if(filobj.length>0){
            var tripname=filobj[0].tripid;
             if(arr[tripname]==undefined){

                 async.series([                           // <--- should run syncronously
                    function(errorCallback){
                          var temp = new trip(tripname);
                          temp.loadData();
                          arr[tripname]=temp;
                          arr[tripname].loadData();
                          errorCallback();        
                      }
                      ]
                    );                                     // <-- .........

            }
                setTimeout(function(){
                        arr[tripname].cal(obj);             //TEST TARGET:: .cal() should be called succesfully  
                        }, 1000);
        }
        
        else console.log('Invalid data from server');

    }
    
    else console.log('Initial data has not finished fetching');
    

}


exports.loadData=function(){ // ignore since it is loading data from server
    console.log("loadData function called");
    db.getTripFromEmei(function(collection){
        collection.find().toArray(function(err, items) {
            tripdata=items;
            module.exports.testdata=tripdata;
            ready=true;
        });
        
    });
    console.log("loadData function finished");
}

