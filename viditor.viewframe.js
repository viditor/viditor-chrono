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
		$("#pauseplay").removeClass("toggled");
		
		return this;
	}
	
	this.play = function()
	{
		$("video").get(0).play();
		$("#pauseplay").addClass("toggled");
		
		var instance = Instances.findOne();
		
		if(instance)
		{
			Session.set("cursor_instance", instance._id);
			
			var cursor_id = Session.get("cursor");
			Cursors.update(cursor_id, {$set: {global_position: instance.position}});
		}
		
		return this;
	}
	
	this.stop = function()
	{
		Videieio.pause();
		
		var cursor_id = Session.get("cursor");
		Cursors.update(cursor_id, {$set: {global_position: 0, local_position: 0}});
		
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
}

if(Meteor.isClient)
{
	Template.viewframe.selected_instance = function()
	{
		return Instances.findOne(Session.get("selection"));
	}
	
	Template.viewframe.asset_name = function()
	{
		return Assets.findOne(this.asset).name;
	}
	
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
		},
		"keyup #selectedPosition, change #selectedPosition": function(event)
		{
			var _id = Session.get("selection");
			var instance = Instances.findOne(_id);
			
			var beginposition = parseInt($(event.currentTarget).val()) || 0;
			var endposition = beginposition + instance.length; //trim?
			Instances.update(_id, {$set: {position: beginposition, endposition: endposition}});
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
		
		$("video").on("timeupdate", function()
		{
			if(!$(this).get(0).paused)
			{
				var instance_id = Session.get("cursor_instance");
				
				if(instance_id)
				{
					var currentTime = $(this).get(0).currentTime;
					//var endTime = cursor.instance_id.length; //trim?
					
					var cursor_id = Session.get("cursor");
					Cursors.update(cursor_id, {$set: {local_position: currentTime}});
					
					//if(currentTime >= endTime)
					if($(this).get(0).ended)
					{
						Session.set("cursor_instance")
						
						var duration = $(this).get(0).duration;
						var cursor_id = Session.get("cursor");
						Cursors.update(cursor_id, {$set: {local_position: 0}, $inc: {global_position: duration}});
					}
				}
			}
		});
	});
	
	Meteor.startup(function()
	{
		Deps.autorun(function()
		{
			var instance_id = Session.get("cursor_instance");
			
			var handle = undefined;
			if(instance_id)
			{
				var instance = Instances.findOne(instance_id);
				handle = instance.handle;
			}
				
			$("#viewframe").find("source#mp4").attr("src", "videos/" + handle + ".mp4");
			$("#viewframe").find("source#webm").attr("src", "videos/" + handle + ".webm");
			$("#viewframe").find("source#ogv").attr("src", "videos/" + handle + ".ogv");
			$("#viewframe").find("video").get(0).load();
		});
	});
}