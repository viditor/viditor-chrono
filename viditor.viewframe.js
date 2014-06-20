Playback = new function()
{
	this.pauseplay = function()
	{
		if(this.isPlaying())
		{
			this.pause();
		}
		else
		{
			this.play();
		}
		
		return this;
	}
	
	this.pause = function()
	{
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {playing: false}});
		
		return this;
	}
	
	this.play = function()
	{
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {playing: true}});
		
		return this;
	}
	
	this.stop = function()
	{
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {playing: false, position: 0}});
		
		return this;
	}
	
	this.isPlaying = function()
	{
		var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);

		return cursor.playing;
	}
	
	this.muteunmute = function()
	{
		if(this.isMuted())
		{
			this.unmute();
		}
		else
		{
			this.mute();
		}
		
		return this;
	}
	
	this.mute = function()
	{
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {muted: true}});
		
		return this;
	}
	
	this.unmute = function()
	{
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {muted: false}});
		
		return this;
	}
	
	this.isMuted = function()
	{
		var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);

		return cursor.muted;
	}
}

if(Meteor.isClient)
{
	Template.viewframe.events(
	{
		"click #pauseplay": function()
		{
			Playback.pauseplay();
		},
		"click video": function()
		{
			Playback.pauseplay();
		},
		"click #muteunmute": function()
		{
			Playback.muteunmute();
			
		},
		"click #stop": function()
		{
			Playback.stop();
		}
	});
	
	Meteor.startup(function()
	{
		$(document).on("keypress", function(event)
		{
			if(event.keyCode == SPACEBAR_KEYCODE)
			{
				Playback.pauseplay();
			}
		});
	});
	
	Meteor.startup(function()
	{
		Deps.autorun(function()
		{
			var video = $("video").get(0);
			var cursor_id = Session.get("cursor");
			var cursor = Cursors.findOne(cursor_id);

			if(cursor)
			{
				//console.log("!!!", cursor);


				if(cursor.playing)
				{
					$("video").get(0).play();
					$("#pauseplay").addClass("toggled");
				}
				else
				{
					$("video").get(0).pause();
					$("#pauseplay").removeClass("toggled");
				}


				if(cursor.muted)
				{
					$("video").get(0).muted = true;
					$("#muteunmute").addClass("toggled");
				}
				else
				{
					$("video").get(0).muted = false;
					$("#muteunmute").removeClass("toggled");
				}


				if(video.handle)
				{
					if(video.handle != cursor.handle)
					{
						video.handle = cursor.handle;
						$(video).find("source#mp4").attr("src", "videos/" + video.handle + ".mp4");
						$(video).find("source#webm").attr("src", "videos/" + video.handle + ".webm");
						$(video).find("source#ogv").attr("src", "videos/" +video. handle + ".ogv");
						video.load();
					}
				}
				else
				{
					video.handle = "inthecar";
					$(video).find("source#mp4").attr("src", "videos/" + video.handle + ".mp4");
					$(video).find("source#webm").attr("src", "videos/" + video.handle + ".webm");
					$(video).find("source#ogv").attr("src", "videos/" +video. handle + ".ogv");
					video.load();
				}
			}
		});
	});
}

var SPACEBAR_KEYCODE = 32;