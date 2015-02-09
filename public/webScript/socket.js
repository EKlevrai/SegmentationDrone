  var socket = io();
  document.getElementById("test").onclick=function(){
	socket.emit('goTest');
};
socket.on("stream",function(data){document.getElementById("screen").src=data.stream;});