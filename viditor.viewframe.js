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
		if(instance) {Session.set("currentlyPlayingVideo", instance._id);}
		//if($("video").get(0).currentTime) {$("video").get(0).currentTime = 0;}
		
		return this;
	}
}

if(Meteor.isClient)
{
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
			var _id = Session.get("currentlyPlayingVideo");
			
			if(_id)
			{
				var currentTime = $(this).get(0).currentTime;
				var endTime = Instances.findOne(_id).length; //trim? //sessioned?
				
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
			var _id = Session.get("currentlyPlayingVideo");
			
			if(_id)
			{
				var handle = Instances.findOne(_id).handle; //sessioned?
				
				$("#viewframe").find("source#mp4").attr("src", "videos/" + handle + ".mp4");
				$("#viewframe").find("source#webm").attr("src", "videos/" + handle + ".webm");
				$("#viewframe").find("source#ogv").attr("src", "videos/" + handle + ".ogv");
				$("#viewframe").find("video").get(0).load();
			}
		});
	});
}