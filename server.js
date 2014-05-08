var express = require("express");
var socketio = require("socket.io");
var mongojs = require("mongojs");

var HOME_PAGE = "home.html";
var ERROR_PAGE = "error.html";
var SRC_DIR = "source_directory/";

var application = express();

application.get("/*", function(request, response)
{
	//get the details of the request.
	var path = request.params[0];
	
	if(path == new String())
	{
		//if the homepage (as "/") was
		//requested, then return the page.
		response.sendfile(SRC_DIR + HOME_PAGE);
	}
	else if(require("fs").existsSync(SRC_DIR + path + ".html"))
	{
		//if a route (such as "/about" or "/contact") was
		//requested, then return the appropriate route.
		response.sendfile(SRC_DIR + path + ".html");
	}
	else if(require("fs").existsSync(SRC_DIR + path))
	{
		//if a resource (such as "/script.js") was
		//requested, then return the resource.
		response.sendfile(SRC_DIR + path);
	}
	else
	{
		//if a file that isn't yet available (such
		//as "/vidater") was requested, then return
		//a file to redirect back to the homepage.
		response.sendfile(SRC_DIR + ERROR_PAGE);
	}
});

//configure the application to listen on
//the network for requests and responses.
var server = application.listen(port = 80);
console.log("Now listening on port " + port);

//connect to the database, assuming that the
//database has been configured for this system.
var db = mongojs("viditor", ["vidbits", "assets"]);

//dump any information that
//is currently in the database.
db.vidbits.drop(); db.assets.drop();

//insert some data to mess around with while developing this application.
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
});