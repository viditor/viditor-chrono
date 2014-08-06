timeline_width_dependency = new Deps.Dependency;

if(Meteor.isClient)
{
	Template.timeline.events =
	{
		"click": function(event)
		{
			Session.set("selected clip_id", undefined);
			
			var cursor_id = Session.get("cursor_id");
			var position = pixel2tick(event.clientX);
			Cursors.update(cursor_id, {$set: {position: position}});
		}
	}
	
	Template.timeline.width = function()
	{
		var timeline = $("#timeline").get(0);
		timeline_width_dependency.depend();
		
		if(timeline)
		{
			var scrollWidth = timeline.scrollWidth;
			var clientWidth = timeline.clientWidth;
			
			$("#timeline > #container").css("width", "");
			var width = scrollWidth /*+ (clientWidth / 2)*/ + "px";
			console.log("width: " + width + ";");
			return "width: " + width + ";";
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
		$(window).on("beforeunload", function()
		{
			var cursor_id = Session.get("cursor_id")
			Cursors.remove(cursor_id);
		});
		
		$(document).mousewheel(function(event)
		{
			if(event.deltaY > 0)
			{
				var zoom = Session.get("zoom") + 1;
				Session.set("zoom", Math.min(zoom, 9));
			}
			else if(event.deltaY < 0)
			{
				var zoom = Session.get("zoom") - 1;
				Session.set("zoom", Math.max(zoom, 1));
			}
		});
	});
}

if(Meteor.isServer)
{
	Cursors.remove({});
}