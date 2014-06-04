Videieio = new function()
{
	this.pauseplay = function()
	{
		if(this.isPaused())
		{
			this.play();
		}
		else
		{
			this.pause();
		}
		
		return this;
	}
	
	this.pause = function()
	{
		$("video").get(0).pause();
		$("#viewframe").find("#pauseplay").removeClass("toggled");
		
		var cursor = Session.get("cursor");
		cursor.playing = false;
		Session.set("cursor", cursor);
		
		return this;
	}
	
	this.play = function()
	{
		$("video").get(0).play();
		$("#viewframe").find("#pauseplay").addClass("toggled");
		
		var cursor = Session.get("cursor");
		cursor.playing = true;
		Session.set("cursor", cursor);
		
		return this;
	}
	
	this.stop = function()
	{
		Videieio.pause();
		
		var cursor = Session.get("cursor");
		cursor.position = 0;
		Session.set("cursor", cursor);
		
		return this;
	}
	
	this.isPaused = function()
	{
		var playing = Session.get("cursor").playing;
		return !playing;
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
	Session.set("currentlyPlayingVideo");
	Session.set("currentlySelectedVideo");
			
	Template.viewframe.helpers(
	{
		selectedVideo: function()
		{
			return Instances.findOne(Session.get("currentlySelectedVideo"));
		},
		backgroundImage: function()
		{
			return "url(videos/" + this.handle + ".jpg)";
		},
		name: function()
		{
			return Assets.findOne(this.asset).name;
		}
	});
	
	Template.viewframe.events(
	{
		"click video, click #pauseplay": function()
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
		},
		"keydown video": function(event)
		{
			Videieio.pauseplay();
		},
		"keyup #selectedPosition, change #selectedPosition": function(event)
		{
			var value = parseInt($(event.currentTarget).val()) || 0;
			var _id = Session.get("currentlySelectedVideo");
			Instances.update(_id, {$set: {position: value}});
		}
	});
	
	/*Instances.find({}, {sort: {position: 1}}).observe(
	{
		movedTo: function(doc, from, to, before)
		{
			console.log(doc._id, from, to);
		}
	});*/
	
	$(document).ready(function()
	{
		$(document).on("keypress", function(event)
		{
			if(event.keyCode == 32)
			{
				Videieio.pauseplay();
			}
		});
		
		$("video").on("timeupdate", function()
		{
			var instance = Session.get("currentlyPlayingVideo");
			
			if(instance)
			{
				/*var currentTime = $(this).get(0).currentTime;
				var endTime = instance.length; //trim?
				
				if(currentTime >= endTime)*/
				if($(this).get(0).ended)
				{
					Session.set("currentlyPlayingVideo");
				}
			}
		});
	});
	
	Meteor.startup(function()
	{
		Deps.autorun(function()
		{
			var instance = Session.get("currentlyPlayingVideo");
			var handle = undefined;
			
			if(instance)
			{
				var handle = instance.handle;
			}
				
			$("#viewframe").find("source#mp4").attr("src", "videos/" + handle + ".mp4");
			$("#viewframe").find("source#webm").attr("src", "videos/" + handle + ".webm");
			$("#viewframe").find("source#ogv").attr("src", "videos/" + handle + ".ogv");
			$("#viewframe").find("video").get(0).load();
		});
	});
}