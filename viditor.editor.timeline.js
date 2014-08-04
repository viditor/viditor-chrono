if(Meteor.isClient)
{
	Template.timeline.events =
	{
		"click": function()
		{
			Session.set("selected", undefined);
		}
	}
	
	Meteor.startup(function()
	{
		$(document).mousewheel(function(event)
		{
			if(event.deltaY > 0)
			{
				//console.log("zoom in");
			}
			else if(event.deltaY < 0)
			{
				//console.log("zoom out");
			}
		});
	});
}