//var assert = require("assert"); // node.js 1e module
var assert = require('chai').assert;
var expect = require('chai').expect;
var should = require('chai').should();
var _=require("underscore");
var Q=require("q");

var stringToJSON=require("../control/stringToJSON");
var obj=require("../alpha/obj.js");
var db=require("../model/mongoDBhandler");
var dbtest=require("../alpha/db");
var tripobj=require("../control/trip");
var app=require("../app");
var logic=require('../control/logic');

var net = require('net');
var HOST = '127.0.0.1';
var PORT = 6969;
var client;

///-----------------------------

/*describe('Connection', function(){
  describe('Connecting to the server', function(){
    it('connection established at ' + HOST + ':' + PORT, function(done){
    	client = new net.Socket();
    	client.connect(PORT, HOST, function() {
    	console.log();
    	done();
});
    })

    it('data string send', function(done){
    	client.write('Vimukthi is the best');
    	done();
    })



  })
})*/

//------------------------------------

describe('String to JSON', function(){

	it('loaded the module', function(done){
    	done();
    })

    it('invoking the convert function', function(done){
    	done();
    })

    // it('invoking the convert function with parameter', function(){
    // 	assert.equal(stringToJSON.convert('vimukthi'),'vimukthi weerasiri');
    // })

    it('calling and returning imei', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').imei,1234567);
    })

    it('calling and returning latitude', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').latitude,79.654);
    })

    it('calling and returning longitude', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').longitude,3.5667);
    })

   /* it('calling and returning sent time', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').sent,'Thu Nov 11 2010 04:12:32 GMT+0530 (IST)');
    }) */

    it('getting hour', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').sent.getHours(),4);
    })
    it('getting minutes', function(){
    	assert.equal(stringToJSON.convert('1234567,79.654,3.5667,2010,10,11,4,12,32,32,32.98').sent.getMinutes(),12);
    })


})

////////////////////////////////////////////////////////

describe('Testing classes', function(){

	it('loaded the module obj', function(done){
    	done();
    })

})

describe('Testing object array', function(){
	var objArr=[];
	it('initializze the empty array', function(){
    	assert.isArray(objArr);
    })
    it('add an element', function(){
    	var newObj=new obj(1);
    	objArr.push(newObj);
    	assert.lengthOf(objArr,1);
    })
    it('add another element', function(){
    	var newObj=new obj(4);
    	objArr.push(newObj);
    	assert.lengthOf(objArr,2);
    })
    it('loop throw the array', function(){
    	assert.equal(objArr[0].method(),11);
    	assert.equal(objArr[1].method(),14);
    })


})

/////////////////////////////////////////////////////////

describe('Database', function(){
    it('Loading the testing module and method', function(done){
        done();
    })
/*    it('retrieving from database', function(done){
        db.connect(function(collection){
            collection.find().toArray(function(err, items) {
                assert.equal(_.last(items).name,'einstein');
            });
            done();
        });
    })*/

    it('retrieving from imietrip', function(done){
        db.getTripFromEmei(function(collection){
            collection.find().toArray(function(err, items) {
//                assert.equal(_.last(items).imei,12345);
                assert.equal(items.length>0,true);
            });
            done();
        });
    })

/*    it('retrieving stationtimes by id', function(done){
        db.getStationTimes(345,function(collection){
            collection.toArray(function(err, items) {
//                assert.equal(_.last(items).reachtime,926);
                assert.equal(items.length>0,true);
            });
            done();
        });
    }) */

/*    it('retrieving data by trip', function(done){
        db.getData(456,function(collection){
            collection.toArray(function(err, items) {
//                assert.equal(_.last(items).next,14);
                assert.equal(items.length>0,true);
            });
            done();
        });
    }) */

})

///////////////////////////////////////////////////////

describe('Trip class', function(){
    var trip1;
    var trip2;
    trip1=new tripobj(123);
    trip2=new tripobj(123);

  /*  it("set data object 1: added 1s delay for the test", function(done){
        trip1.loadData();
        setTimeout(function(){
//            console.log('from test',trip1.stationReachingTimes);
            done();
        },200);
    }); */

    it("set data object 2: added 1s delay for the test", function(done){
        trip2.loadData();
        setTimeout(function(){
//            console.log('from test',trip2.stationReachingTimes);
            done();
        },200);
    });

})

////////////////////////////////////////////////////////

/*describe('TCP Server', function(){
    it('Getting the app.js', function(){
    })
})*/

////////////////////////////////////////////////////////


describe('Logic', function(){
    it('import the module', function(){
    });

    it('above should return data has not finished fetching', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,4,12,32,32,32.98');
    });

    it('Loading data from db', function(done){
        logic.loadData();
        setTimeout(function(){done()},1000);
    });

    it('input: 12345,79.654,3.5667,2010,10,11,4,12,32', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,4,12,32,32,32.98');
    });

    it('input: 12345,79.654,3.5667,2010,10,11,10,12,32', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,10,12,32,32,32.98');
    });
    it('input: 12345234,79.654,3.5667,2010,10,11,10,12,32', function(){
        logic.direct('12345234,79.654,3.5667,2010,10,11,10,12,32,32,32.98');
    });

    it('input: 12345,79.654,3.5667,2010,10,11,10,12,32', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,10,12,32,32,32.98');
    });
    
    it('Setting a time out to finish data fetching to trip', function(done){
        setTimeout(function(){
            done();
        },1000);
    });

    it('After data has fetched to trip', function(){
        //logic.direct('12345,79.654,3.5667,2010,10,11,10,12,32,32,32.98');
    });



    it('input: 12345,79.654,3.5667,2010,10,11,15,12,32', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,15,12,32,32,32.98');
    });

    it('Setting a time out to finish data fetching to trip', function(done){
        setTimeout(function(){
            done();
        },1000);
    });

   /* it('After data has fetched to trip', function(){
        logic.direct('12345,79.654,3.5667,2010,10,11,15,12,32,32,32.98');
    });*/
    
    
    
    
    
    

/*    it('setting input already taken', function(){
        logic.direct(12345,79.654,3.5667,2010,10,11,4,12,32,32,32.98);
    });
    it('setting input second time', function(){
        logic.direct(23456,79.654,3.5667,2010,10,11,4,12,32,32,32.98);
    });*/


/*
    it("test loaded data", function(done){
        setTimeout(function(){
            console.log(logic.testdata);
            done();
        },1000);
    });

    it("test loaded data", function(){
    });*/


});

////////////////////////////////////////////////////////

describe('Object array querying', function(){
    var objarr=[];
    it('making an array', function(){
        objarr.push({'name':'vimukthi','age':24,'skill':100});
        objarr.push({'name':'einstein','age':19,'skill':100});
    });

    it('accessing the array', function(){
        assert.equal(objarr[0].name,'vimukthi');
        assert.equal(objarr[1].name,'einstein');
    });

    it('filtering age>20', function(){
        var newobj=objarr.filter(function(element){
            return element.age>20;
        });
    });


 })

////////////////////////////////////////////////////////

describe('New Trip test case', function(){
    it('sending the data with imei', function(){
        logic.direct('12345678,33,3,2010,10,11,10,12,32,32,32.98');
    });

    it('Setting a time out to finish data fetching to trip', function(done){
        setTimeout(function(){
            done();
        },1000);
    });

    it('sending the same request again', function(){
        logic.direct('12345678,33,3,2010,10,11,10,12,32,32,32.98');
    });

    it('Setting a time out to finish data fetching to trip', function(done){
        setTimeout(function(){
            done();
        },1500);
    });



 })

////////////////////////////////////////////////////////

/*describe('Object array querying', function(){
 it('making an array', function(){
 assert.isDefined();

 });



 })*/

////////////////////////////////////////////////////////

//////////////////// END-TO-END TESTING //////////////////// 


