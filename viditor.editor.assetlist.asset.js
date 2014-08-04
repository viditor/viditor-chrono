if(Meteor.isClient)
{
	Template.asset.thumbnail = function()
	{
		var background_color = this.color;
		return "background-color: " + background_color + ";";
	}
	
	Template.asset.events =
	{
		"click": function()
		{
			Clips.insert({track: "alpha", color: this.color, position: 0, length: 10, right_trim: 0, left_trim: 0});
		}
	}
	
	//Template.asset.rendered = function()
	//{
	//	var rendering = this.find(".asset");
	//	$(rendering).draggable({/*...*/});
	//}
}