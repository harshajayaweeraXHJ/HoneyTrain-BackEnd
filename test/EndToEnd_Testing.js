//////////////////// END-TO-END TESTING //////////////////// 
// DATE : 08-03-2015

var expect  = require('chai').expect,
	assert  = require('chai').assert,
	//should  = require('chai').should();
	should  = require('should'),

	io      = require('socket.io-client');

	var server;
	var app;
	var socketURL = 'http://localhost:6969';
	var option = {
	  transports: ['websocket'],
	  'force new connection' : true	
	};


	describe('End to end testing ->', function(){
	  
	  describe('Check basic setup', function(){
	  	it('checks wether basic setup is working', 
	  	 function(){
	  	 	expect(true).be.true;
	  	});
	  });

	 var endSocket; 
	  
	 

	  describe('Check notification emiting process', function(){
	   beforeEach(function(){
	   
	   app = require('../app');
	   server = app.server;


	  	
	 	}); 		

	    it('emits the notification to client when GPS-Data reserved', function(done){
	   	  var endSocket = io.connect(socketURL, option);
	   	  	endSocket.on('connect', function(){
	    		console.log("socket io test instance works");

	    		done();
	    	}); 

	        endSocket.on('GPSServer', function(msg){
	    		console.log("socket io test GPSServer event works");
	    		done();
	    	}); 
	    	
	    	app.logic("12345671,7.152596,80.058578,2014,12,25,07,11,34,3.17,32.98");
	    	console.log("checks for the execution 1 ************************");
	    	app.logic("12345671,7.152590,80.058570,2014,12,25,07,11,35,3.09,32.98");
	    	console.log("checks for the execution 2 ************************");
	    	

	    });	
	  })	

	});

