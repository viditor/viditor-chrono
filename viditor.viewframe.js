Videieio = new function()
{
	this.pauseplay = function()
	{
		if(this.isActive())
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
		$("#pauseplay").removeClass("toggled");

		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {active: false}});
		
		return this;
	}
	
	this.play = function()
	{
		$("#pauseplay").addClass("toggled");

		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {active: true}});

		return this;

		/*var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);

		var instance = Instances.findOne({position: {$lte: cursor.position}, endposition: {$gt: cursor.position}});
		if(instance)
		{
			Session.set("cursor_instance", instance._id);
			
			var start = cursor.position - instance.position;
			var times = "#t=" + start + "," + instance.length;
			$("#viewframe").find("source#mp4").attr("src", "videos/" + instance.handle + ".mp4" + times);
			$("#viewframe").find("source#webm").attr("src", "videos/" + instance.handle + ".webm" + times);
			$("#viewframe").find("source#ogv").attr("src", "videos/" + instance.handle + ".ogv" + times);
			$("#viewframe").find("video").get(0).load();
			
			$("video").get(0).play();
			$("#pauseplay").addClass("toggled");
			
			return this;
		}
		
		instance = Instances.findOne({position: {$gte: cursor.position}});
		if(instance)
		{
			Session.set("cursor_instance", instance._id);
			
			Cursors.update(cursor_id, {$set: {position: instance.position}});
			
			$("video").get(0).play();
			$("#pauseplay").addClass("toggled");
			
			$("#viewframe").find("source#mp4").attr("src", "videos/" + instance.handle + ".mp4");
			$("#viewframe").find("source#webm").attr("src", "videos/" + instance.handle + ".webm");
			$("#viewframe").find("source#ogv").attr("src", "videos/" + instance.handle + ".ogv");
			$("#viewframe").find("video").get(0).load();
		}*/
		
		return this;
	}
	
	this.stop = function()
	{
		Videieio.pause();
		
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {position: 0}});
		
		return this;
	}
	
	this.isActive = function()
	{
		var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);

		return cursor.active;
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
		$("video").get(0).muted = true;
		$("#viewframe").find("#muteunmute").addClass("toggled");
		
		return this;
	}
	
	this.unmute = function()
	{
		$("video").get(0).muted = false;
		$("#viewframe").find("#muteunmute").removeClass("toggled");
		
		return this;
	}
	
	this.isMuted = function()
	{
		return $("video").get(0).muted;
	}
}

if(Meteor.isClient)
{
	Template.viewframe.events(
	{
		"click #pauseplay, click video": function()
		{
			Videieio.pauseplay();
		},
		"click #muteunmute": function()
		{
			Videieio.muteunmute();
			
		},
		"click #stop": function()
		{
			Videieio.stop();
		}
	});
	
	Meteor.startup(function()
	{
		$(document).on("keypress", function(event)
		{
			var SPACEBAR_KEYCODE = 32;
			if(event.keyCode == SPACEBAR_KEYCODE)
			{
				Videieio.pauseplay();
			}
		});
		
		/*$("video").on("timeupdate", function()
		{
			var instance_id = Session.get("cursor_instance");
			var instance = Instances.findOne(instance_id);
			
			if(instance_id)
			{
				if(!$(this).get(0).paused)
				{
					var currentTime = $(this).get(0).currentTime;
					//var endTime = cursor.instance_id.length; //trim?
					var cursor_id = Session.get("cursor");
					Cursors.update(cursor_id, {$set: {position: instance.position + currentTime}});
				}
				
				//if(currentTime >= endTime)
				if($(this).get(0).ended)
				{
					Videieio.pause();
					Session.set("cursor_instance");
				}
			}
		});*/
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
				console.log("!");
				if(cursor.active)
				{
					video.play();
				}
				else
				{
					video.pause();
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