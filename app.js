
/**
 * Module dependencies.
 */

var socketHandler=require('./socketHandler.js');
var http = require('http');
var app_drone = http.createServer();
var express = require("express");
app_drone.listen(3000);


//require("dronestream").listen(http.createServer(app_video), { ip: "192.168.1.1" });

drone = require("dronestream");
var server = http.createServer(function(req, res) {
require("fs").createReadStream(__dirname + "/index.html").pipe(res);
});
drone.listen(server);
server.listen(5555);//,{ ip: "192.168.1.5" });


var io = require('socket.io').listen(app_drone);
io.sockets.on('connection', function (socket) {
	socketHandler.set(socket);
});

