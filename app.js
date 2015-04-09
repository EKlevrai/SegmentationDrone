
/**
 * Module dependencies.
 */
var arDrone = require('ar-drone');
var client = arDrone.createClient();
var socketHandler=require('./socketHandler.js');
var http = require('http');
var app_drone = http.createServer();
var express = require("express");
app_drone.listen(3000);

var io = require('socket.io').listen(app_drone);
io.sockets.on('connection', function (socket) {
	socketHandler.set(socket,client);
});


var pngStream = client.getPngStream();
var video = client.getVideoStream();

var lastPng;
video.on('data', function(pngBuffer) {
    lastPng = pngBuffer;
});
/*
  .on('error', console.log)
  .on('data', function(pngBuffer) {
    lastPng = pngBuffer;
  });
*/
var server = http.createServer(function(req, res) {
  if (!lastPng) {
    res.writeHead(503);
    res.end('Did not receive any png data yet.');
    return;
  }

  res.writeHead(200, {'Content-Type': 'image/png'});
  res.end(lastPng);
});

server.listen(8080, function() {
  console.log('Serving latest png on port 8080 ...');
});
