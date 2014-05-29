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
		
		return this;
	}
	
	this.play = function()
	{
		$("video").get(0).play();
		$("#viewframe").find("#pauseplay").addClass("toggled");
		
		return this;
	}
	
	this.isPaused = function()
	{
		return $("video").get(0).paused;
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
	
	this.stop = function()
	{
		var instance = Instances.findOne({}, {sort: {position: 1}});
		if(instance) {Session.set("currentlyPlayingVideo", instance);}
		//if($("video").get(0).currentTime) {$("video").get(0).currentTime = 0;}
		
		return this;
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
		{;
			var handle = this.handle;
			//var handle = Session.get("currentlySelectedVideo").handle;
			return "url(videos/" + handle + ".jpg)";
		},
		name: function()
		{
			var asset = this.asset;
			//var asset = Session.get("currentlySelectedVideo").asset;
			return Assets.findOne(asset).name;
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
				var currentTime = $(this).get(0).currentTime;
				var endTime = instance.length; //trim?
				
				if($("video").get(0).ended) //if(currentTime >= endTime)
				{
					//var timeline = Instances.find({}, {sort: {position: 1}}).fetch();
					//var index; for(var i in timeline) {if(timeline[i]._id == _id) {index = i;}}
					
					//console.log(timeline.length, index, timeline);
					//console.log(Instances.findOne({}, {skip: index}));
				}
			}
		});
	});
	
	Meteor.startup(function()
	{
		Deps.autorun(function()
		{
			var instance = Session.get("currentlyPlayingVideo");
			
			if(instance)
			{
				var handle = instance.handle;
				
				$("#viewframe").find("source#mp4").attr("src", "videos/" + handle + ".mp4");
				$("#viewframe").find("source#webm").attr("src", "videos/" + handle + ".webm");
				$("#viewframe").find("source#ogv").attr("src", "videos/" + handle + ".ogv");
				$("#viewframe").find("video").get(0).load();
			}
		});
	});
}