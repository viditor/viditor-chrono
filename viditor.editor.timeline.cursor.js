if(Meteor.isClient)
{
	Template.cursor.position = function()
	{
		var left = this.position * PIXELS_PER_TICK + "px";
		return "left: " + left + ";";
	}
	
	Template.cursor.color = function()
	{
		var border_color = this.color;
		return "border-color: " + border_color + ";";
	}
}