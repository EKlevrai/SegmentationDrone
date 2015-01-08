
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path');
var navigator=require('./navigator.js');
var app = express();
var server = http.createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3001;

// all environments
app.set('port', process.env.PORT || 3001);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));



app.use(routes.index);//redirect sur la page web

server.listen(port, function () {
	console.log('Server listening at port %d', port);
	});


io.on('connection', function (socket) {
	console.log('yomabite');
	socket.on('goTest',
		function(){console.log("SUCE");
		navigator.test({});console.log("mabite");
	});
});

