var socket = io.connect("http://localhost");

socket.on("connect", function()
{
	console.log("connection opened");
});

//establish some constants
//for maintaining the current
//state of the player.
var PLAY = 1, PAUSE = 0;

var video_player = {
	"current_frame": [],
	"current_frame_start": 0,
	"current_frame_end": 0,
	"buffered_frame": [],
	"buffered_frame_start": 0,
	"buffered_frame_end": 0,
	"local_position": 0, 
	"global_position": 0,
	"total_frames": 0,
	"status": PAUSE, 
	"speed": 100//fps
};

var control_toggle = function()
{
	if(video_player["status"] == PLAY)
	{
		pause_video();
	}
	else
	{
		play_video();
	}
}

var play_video = function()
{
	video_player["status"] = PLAY;
}

var pause_video = function()
{
	video_player["status"] = PAUSE;
}

var clear_buffers = function()
{
	 video_player = {
		"current_frame": [],
		"current_frame_start": 0,
		"current_frame_end": 0,
		"buffered_frame": [],
		"buffered_frame_start": 0,
		"buffered_frame_end": 0,
		"local_position": 0, 
		"global_position": 0,
		"total_frames": 0,
		"status": PAUSE, 
		"speed": 100//fps
	};	
}
var start_from_the_bottom = function()
{
	socket.emit("start_from_the_bottom");
}

var request_buffer_frame = function(index)
{
	socket.emit("request_buffer_frame", {frame: index});
}

//current frame: buffered frames to play now
//buffer frame: buffered frames to play next

socket.on("current_frame", function(data)
{
	//the only time we would call this function
	//is after the page has loaded, or when the
	//user skips ahead in the video.

	video_player["current_frame"] = data.frame;
	video_player["current_frame_start"] = data.global_start;
	video_player["current_frame_end"] = data.global_end;
	video_player["total_frames"] = data.total_frames;
	
	play_video(); //this means it'll play whenever it skips!!
	
	//because this is the current frame,
	//we be sure to play it now.
});

socket.on("buffer_frame", function(data)
{
	video_player["buffer_frame"] = data.frame;
	video_player["buffer_frame_start"] = data.global_start;
	video_player["buffer_frame_end"] = data.global_end;
	video_player["total_frames"] = data.total_frames;
});

$( "#play" ).on( "click", play_video);

$( "#pause" ).on( "click", pause_video);

$( "#control-timeline-range" ).on( "click", function()
{
	pause_video();
	var new_frame = ($(this).val()/100.0*video_player["total_frames"]);
	new_frame = Math.floor(new_frame);
	clear_buffers();
	socket.emit("start_from_specific", {frame: new_frame})
	if($("#control-toggle").hasClass("pause"))
	{
		$("#control-toggle").toggleClass("pause");
	}
});

$("#control-toggle").click(function()
{
	$(this).toggleClass("pause");
	control_toggle();
});

$("#control-fullscreen").click(function() {
	$(this).toggleClass("full");
	//TODO: enter full screen jquery manipulation here
});

var update_progress_bar = function(){
	var progress_value = (video_player["current_frame_start"] + video_player["local_position"])/video_player["total_frames"]*100.0;
	progress_value = 100 - progress_value;
	$("#control-timeline-played").css("right", (progress_value + "%"));
}

var swap_current_for_buffer = function()
{
	video_player["local_position"] = 0;
	video_player["current_frame"] = video_player["buffer_frame"];
	video_player["current_frame_start"] = video_player["buffer_frame_start"];
	video_player["current_frame_end"] = video_player["buffer_frame_end"];
}

var video_controller = function()
{
	//means that this video is ready to be played
	if(video_player["status"] == PLAY)
	{
		var frame_set = video_player["current_frame"];
		var local_position = video_player["local_position"];

		$("#mediap").attr("src", frame_set[local_position]);

		video_player["local_position"]++;

		update_progress_bar();
		
		if(local_position >= video_player["current_frame"].length)
		{
			//need to switch to next buffer and request new frame
			swap_current_for_buffer();
			request_buffer_frame(video_player["current_frame_end"]);
		}
	}
}

$(window).load(function()
{
	setInterval(video_controller, video_player["speed"]);
	start_from_the_bottom();
});