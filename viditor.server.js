var express = require("express");
var socketio = require("socket.io");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server, {log: false});

app.get("/", function(request, response)
{
	fs.readFile("viditor.index.html", function(error, data)
	{
		if(error)
		{
			response.writeHead(500, {"content-type": "text/plain"});
			return response.end(error.toString());
		}
		
		response.writeHead(200, {"content-type": "text/html"});
		response.end(data);
	});
});

app.use(express.static(__dirname + "/public_resources"));

io.sockets.on("connection", function(socket)
{
	socket.on("instantiate asset", function(data)
	{
		console.log("INSTANTIATE ASSET :: " + JSON.stringify(data));
		io.sockets.emit("instantiate asset", data);
	});
});

server.listen(3000);

console.log("Server is running on 127.0.0.1:3000");