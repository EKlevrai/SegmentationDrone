	var FlightData = require('./FlightData.js');
	
(function() {
	var flight = FlightData.create();
	var sckt;
	var setSocket = function(socket){
		sckt=socket;
		// auto/manual mode
		sckt.on('switch',function(){
		flight.switchMode()})
		;
		//new directions
		sckt.on('new_direction',function(data){console.log(data);flight.direction(data);});

	}
	var send = function(ev){sckt.emit(ev,{});}
	
	module.exports.set = function(s) {setSocket(s);}
	module.exports.send = send
}());
