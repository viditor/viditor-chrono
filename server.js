var express = require("express");
var socketio = require("socket.io");
var mongojs = require("mongojs");

var HOME_PAGE = "home.html";
var ERROR_PAGE = "error.html";
var SRC_DIR = "source_directory/";

var application = express();

application.get("/*", function(request, response)
{
	var path = request.params[0];
	
	if(path == new String())
	{
		response.sendfile(SRC_DIR + HOME_PAGE);
	}
	else if(require("fs").existsSync(SRC_DIR + path + ".html"))
	{
		response.sendfile(SRC_DIR + path + ".html");
	}
	else if(require("fs").existsSync(SRC_DIR + path))
	{
		response.sendfile(SRC_DIR + path);
	}
	else
	{
		response.sendfile(SRC_DIR + ERROR_PAGE);
	}
});

var server = application.listen(port = 80);
console.log("Now listening on port " + port);

/*
var db = mongojs("viditor", ["vidbits", "assets"]);

db.vidbits.drop(); db.assets.drop();

db.assets.insert({assetidnum: 0, filename: "videos/inthecar", length: 36});
db.assets.insert({assetidnum: 1, filename: "videos/children", length: 9});
db.assets.insert({assetidnum: 2, filename: "videos/snowing", length: 13});

var io = socketio.listen(server, {log: false});
io.sockets.on("connection", function(socket)
{
	db.assets.find({}, {_id: 0}).forEach(function(error, data)
	{
		if(data) {socket.emit("uploaded an asset", data);}
	});
	
	db.vidbits.find({}, {_id: 0}).forEach(function(error, data)
	{
		if(data) {socket.emit("inserted a vidbit", data);}
	});
	
	socket.on("inserted a vidbit", function(data)
	{
		socket.broadcast.emit("inserted a vidbit", data);
		db.vidbits.insert(data);
	});
	
	socket.on("updated a vidbit", function(vidbitidnum, data)
	{
		socket.broadcast.emit("updated a vidbit", vidbitidnum, data);
		db.vidbits.update({vidbitidnum: vidbitidnum}, {$set: data});
	});
});*/