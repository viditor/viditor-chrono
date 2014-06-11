Instances = new Meteor.Collection("instances");
Cursors = new Meteor.Collection("cursors");

if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		var _id = Cursors.insert({position: 0});
		Session.set("cursor", _id);
	});
	
	UI.registerHelper("css_width", function()
	{
		var width = this.length * 10 + "px";
		return "width: " + width + ";";
	});
	
	UI.registerHelper("css_background_image", function()
	{
		var background_image = "url(videos/" + this.handle + ".jpg)";
		return "background-image: " + background_image + ";";
	});
	
	UI.registerHelper("css_left", function()
	{
		var left = this.position * 10 + "px";
		return "left: " + left + ";";
	});
	
	Template.timeline.cursor = function()
	{
		var cursor_id = Session.get("cursor");
		return Cursors.findOne(cursor_id);
	}
	
	Template.track.instances = function()
	{
		var track_id = parseInt(this);
		return Instances.find({track: track_id});
	}
	
	Template.timeline.events =
	{
		"click": function(event)
		{
			Session.set("selection", undefined);
		}
	}
	
	Template.track.events =
	{
		"click .instance": function(event)
		{
			Videieio.pause();
			event.stopPropagation();
			Session.set("selection", this._id);
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Instances.remove({});
		Cursors.remove({});
	});
}