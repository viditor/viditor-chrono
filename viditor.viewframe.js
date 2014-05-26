var Videieio = new function()
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
	
	this.load = function()
	{
		$("video").get(0).load();
		
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
		"keydown video": function(event)
		{
			Videieio.pauseplay();
		}
	});
	
	$(document).on("keypress", function(event)
	{
		if(event.keyCode == 32)
		{
			Videieio.pauseplay();
		}
	});
}