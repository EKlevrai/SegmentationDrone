
/**
 * Module dependencies.
 */

var navigator=require('./navigator.js');
var http = require('http')
var app = http.createServer();
app.listen(3000);
console.log('Server running at http://localhost:3000/');

var io = require('socket.io').listen(app);
io.sockets.on('connection', function (socket) {
/*	navigator.on('stream',
				function(d){
					console.log(d);
					//socket.emit('stream',d);
	});
		console.log('yomabite');
	socket.on('goTest',
		function(){console.log("SUCE");
		navigator.test({});console.log("mabite");
	});
	navigator.on('data',function(x){socket.emit('stream',{stream : x});})
*/
console.log("hi");
socket.on('hello', function(data){
	socket.emit("hello",{});
});
navigator.stream(function(data){
	console.log(data);
	socket.emit('stream',data);
})
});

