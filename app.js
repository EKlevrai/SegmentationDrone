
/**
 * Module dependencies.
 */

var socketHandler=require('./socketHandler.js');
var http = require('http');
var app_drone = http.createServer();
var express = require("express");
//var app_video = express();
app_drone.listen(3000);
//app_video.listen(2999);
//require("dronestream").listen(http.createServer(app_video), { ip: "192.168.1.1" });

console.log('Server running at http://localhost:3000/');

//app_video.use(function(req, res, next){res.render('index.ejs');});

var io = require('socket.io').listen(app_drone);
io.sockets.on('connection', function (socket) {
	socketHandler.set(socket);
});

