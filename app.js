var convert     = require('./control/stringToJSON');
var logicF      = require('./control/logic');
var express     = require('express');
var app         = express();
var server      = require('http').Server(app);
    global.io   = require('socket.io')(server); // Global IO instance to use troughtout the modules.
var bodyParser  = require('body-parser');
  

server.listen(6969);
console.log("server is listning on port 6969");


global.io.on('connection', function(socket){
    console.log("Connection Established");
     socket.on('modtestemit', function(data, callback){ // Triger the function calls upon reception of GPS input Data from arduino board.
        console.log("-- GPS-Sim Has Connected --");
        logic(data.testInput);

        callback = callback || function(){};
        callback(null, "Done.");   
     });
        
});

app.use('/test', express.static(__dirname + '/test'));

app.get('/', function(req, res){
    res.sendfile(__dirname + '/socketIOTestScript/socketTest.html'); // test web page to simulate GPS module
        console.log("Data received throught get request");
 
});


var logic = function(data){
             logicF.loadData();
             logicF.direct(data);
            
            }

exports.server = server;
exports.logic = logic; //TEST TARGET:: reference for testing

 