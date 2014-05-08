var Videoplayer = new function()
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
	}
	
	this.pause = function()
	{
		$("video").get(0).pause();
		$("#videoplayer > #control_panel > #play_button").addClass("toggled");
	}
	
	this.play = function()
	{
		$("video").get(0).play();
		$("#videoplayer > #control_panel > #play_button").removeClass("toggled");
	}
	
	this.isPaused = function()
	{
		return $("video").get(0).paused;
	}
	
	this.load = function()
	{
		$("video").get(0).load();
	}
	
	this.loadAndPlay = function()
	{
		this.load();
		this.play();
	}
}