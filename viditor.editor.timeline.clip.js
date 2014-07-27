if(Meteor.isClient)
{
	Template.clip.image = function()
	{
		var background_color = this.color;
		return "background-color: " + background_color + ";";
	}
	
	Template.clip.position = function()
	{
		var left = this.position * PIXELS_PER_TICK + "px";
		return "left: " + left + ";";
	}
}