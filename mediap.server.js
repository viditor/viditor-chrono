var exec = require("child_process").exec;
var express = require("express");
var fs = require("fs");

var app = express();
var server = require('http').createServer(app);
var io = require('socket.io').listen(server, {'log': false});
  
var video_array = [];
var BUFFER_LENGTH = 20;

fs.readFile('processed_videos/current.viduri', function(error, data)
{
    if(error) { throw error; }
    var array = data.toString().split("\n");
    for(value in array)
	{
    	video_array.push(array[value])
    }
});

app.use(express.static(__dirname + "/public_resources"));
app.use(express.static(__dirname + "/public_resources/images"));
app.use(express.bodyParser({keepExtensions: true, uploadDir: "./uploaded_files"}));

app.get("/", function(request, response)
{
	response.sendfile(__dirname + "/public_resources/mediap.home.html");
});

app.get("/upload", function(request, response)
{
	response.sendfile(__dirname + "/public_resources/mediap.upload.html");
});

app.post("/upload", function(request, response)
{
	var timestamp = new Date().getTime();
	exec("ffmpeg -i " + request.files.video.path + " -f image2 uploaded_files/" + timestamp + "-%03d.jpg", function()
	{
		exec("node mediap.convuri.js " + timestamp + " > videos/current.viduri", function()
		{
			response.sendfile(__dirname + "/public_resources/mediap.uploaded.html");
			
			exec("rm uploaded_files/*.jpg");
		});
	});
	
	//database.query("INSERT INTO uploaded SET ?", data);
});

app.get('/mediap', function (request, response)
{
	response.sendfile(__dirname + "/mediap.index.html");
});

var port = 3000;
server.listen(port);

console.log("127.0.0.1:" + port);

var format_video = function (frames, start, end)
{
	return {
		speed: 5,
		frame: frames,
		total_frames: video_array.length,
		global_start: start,
		global_end: end
	};
}

var get_video_buffer_at_index = function(index)
{
	var start = index;
	var end = ((start + BUFFER_LENGTH) > video_array.length) ? video_array.length : start + BUFFER_LENGTH;
	var send_video = video_array.slice(start, end);

	return format_video(send_video, start, end);
}

io.sockets.on('connection', function (socket)
{
	socket.on('request_buffer_frame', function(data)
	{
		var buffer_index = data.frame ;
		var to_send_buffer = get_video_buffer_at_index(buffer_index);
		socket.emit('buffer_frame', to_send_buffer);		
	});

	socket.on('start_from_the_bottom', function()
	{
		console.log("starting at the bottom");
		var to_send = get_video_buffer_at_index(0);
		socket.emit('current_frame', to_send);
		to_send = get_video_buffer_at_index(BUFFER_LENGTH);
		socket.emit('buffer_frame', to_send);
	});
	
	socket.on('start_from_specific', function(data)
	{
		console.log("starting at the specific", data.frame);
		var to_send = get_video_buffer_at_index(data.frame);
		socket.emit('current_frame', to_send);
		to_send = get_video_buffer_at_index(data.frame+BUFFER_LENGTH);
		socket.emit('buffer_frame', to_send);

	});
});