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
		$("#playback").find("#pauseplay").removeClass("toggled");
		
		return this;
	}
	
	this.play = function()
	{
		$("video").get(0).play();
		$("#playback").find("#pauseplay").addClass("toggled");
		
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
		$("#playback").find("#muteunmute").addClass("toggled");
		
		return this;
	}
	
	this.unmute = function()
	{
		$("video").get(0).muted = false;
		$("#playback").find("#muteunmute").removeClass("toggled");
		
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

$(document).ready(function()
{
	$("#playback").find("video").on("click", function()
	{
		Videieio.pauseplay();
	});
	
	$("#playback").find("#pauseplay").on("click", function()
	{
		Videieio.pauseplay();
	});
	
	$("#playback").find("#muteunmute").on("click", function()
	{
		Videieio.muteunmute();
	});
	
	$(document).on("keypress", function(event)
	{
		if(event.keyCode == 32)
		{
			Videieio.pauseplay();
		}
	});
});