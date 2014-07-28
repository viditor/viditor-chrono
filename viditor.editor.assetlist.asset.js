if(Meteor.isClient)
{
	Template.asset.thumbnail = function()
	{
		var background_color = this.color;
		return "background-color: " + background_color + ";";
	}
}