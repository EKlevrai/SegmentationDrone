	var FlightData = require('./FlightData.js');
	
	
(function() {
	var sckt;
	var flight ;
	var socketParrot = require("socket.io-client").connect("http://localhost:3000");
	var set = function(socket,client){
		flight = FlightData.create(client);
		sckt = socket;
		sckt.on('switch',function(){
		flight.switchMode()});
		//new directions
		sckt.on('new_direction',function(data){console.log(data);flight.direction(data);});
		//emergency stop 
		socketParrot.on("stop",function(){console.log("STOP");console.log("STOP");console.log("STOP");console.log("STOP");console.log("STOP");});
	}
	var send = function(ev){sckt.emit(ev,{});}
	
	module.exports.set = function(s,cl) {set(s,cl);}
	module.exports.send = send
}());
