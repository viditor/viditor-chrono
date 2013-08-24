var express = require("express");
var socketio = require("socket.io");
var mysql = require("mysql");
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

var database = mysql.createConnection({host:"localhost", user:"root", password:""});
database.connect(); database.query("USE viditor");

app.use(express.static(__dirname + "/public_resources"));

io.sockets.on("connection", function(socket)
{
	console.log("USER CONNECTED");
	
	database.query("SELECT * FROM uploaded", function(error, data)
	{
		for(var index = 0; index < data.length; index++)
		{
			socket.emit("accessiblize asset", data[index]);
		}
	});
	
	database.query("SELECT * FROM instantiated JOIN uploaded ON instantiated.uploadedidnum = uploaded.uploadedidnum", function(error, data)
	{
		for(var index = 0; index < data.length; index++)
		{
			socket.emit("instantiate asset", data[index]);
		}
	});
	
	socket.on("instantiate asset", function(data)
	{
		console.log("INSTANTIATE ASSET :: " + JSON.stringify(data));
		
		database.query("SELECT * FROM uploaded WHERE uploadedidnum = " + data.uploadedidnum + " LIMIT 1", function(error, datum)
		{
			datum = datum[0];
			
			database.query("INSERT INTO instantiated SET ?", data);
			
			data.filename = datum.filename;
			
			io.sockets.emit("instantiate asset", data);
		});
	});
	
	socket.on("update asset", function(data)
	{
		console.log("UPDATE ASSET :: " + JSON.stringify(data));
		database.query("UPDATE instantiated SET ? WHERE instantiationidnum = " + data.instantiationidnum, data);
		socket.broadcast.emit("update asset", data);
	});
});

server.listen(3000);

console.log("Server is running on 127.0.0.1:3000");