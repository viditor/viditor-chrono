var express = require("express");
var socketio = require("socket.io");
var mysql = require("mysql");
var http = require("http");
var fs = require("fs");

var app = express();
var server = http.createServer(app);
var io = socketio.listen(server, {log: false});

var database = mysql.createConnection({host:"localhost", user:"root", password:""});
database.connect(); database.query("USE viditor");

app.use(express.static(__dirname + "/public_resources"));
app.use(express.bodyParser({keepExtensions: true, uploadDir: "./uploaded_files"}));

app.get("/", function(request, response)
{
	readFileIntoResponse("viditor.index.html", response);
});

app.get("/upload", function(request, response)
{
	readFileIntoResponse("viditor.upload.html", response);
});

app.post("/upload", function(request, response)
{
	oldpath = __dirname + "/" + request.files.video.path;
	newpath = __dirname + "/public_resources/user_assets/" + request.files.video.name;
	
	fs.rename(oldpath, newpath, function(error)
	{
		data = new Object();
		data.uploadedidnum = new Date().getTime();
		file = request.files.video.name.split(".");
		data.filetype = file.pop();
		data.filename = file.join("");
		
		database.query("INSERT INTO uploaded SET ?", data);
	});
	
	readFileIntoResponse("viditor.index.html", response);
});

function readFileIntoResponse(filepath, response)
{
	fs.readFile(filepath, function(error, data)
	{
		if(error)
		{
			response.writeHead(500, {"content-type": "text/plain"});
			return response.end(error.toString());
		}
		
		response.writeHead(200, {"content-type": "text/html"});
		response.end(data);
	});
}

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