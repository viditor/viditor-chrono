if(Meteor.isClient)
{
	Template.timeline.events =
	{
		"click": function(event)
		{
			Session.set("selected", undefined);
			
			var cursor_id = Session.get("cursor_id");
			var position = pixel2tick(event.clientX);
			Cursors.update(cursor_id, {$set: {position: position}});
		}
	}
	
	Template.timeline.cursors = function()
	{
		return Cursors.find({/*project*/});
	}
	
	Template.timeline.created = function()
	{
		var cursor_id = Cursors.insert({position: 1, color: "red"});
		Session.set("cursor_id", cursor_id);
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

if(Meteor.isServer)
{
	Cursors.remove({});
}