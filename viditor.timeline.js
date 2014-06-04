Instances = new Meteor.Collection("instances");
Cursors = new Meteor.Collection("cursors");

if(Meteor.isClient)
{
	var _id = Cursors.insert({position: 0, playing: false});
	Session.set("cursor", _id);
	
	Template.timeline.cursor = function()
	{
		return Cursors.findOne(Session.get("cursor"));
	}
	
	Template.timeline.helpers(
	{
		left: function()
		{
			return this.position * 10 + "px";
		}
	});
	
	var clock = 0;
	loop.func = function()
	{
		var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);
		if(cursor.playing)
		{
			clock += loop.framerate.getCurrent();
			if(clock > 1000)
			{
				Cursors.update(cursor_id, {$inc: {position: 1}});
				
				clock -= 1000;
			}
			
			if(!Session.get("currentlyPlayingVideo"))
			{
				var instance = Instances.findOne({
					position: {$lte: cursor.position},
					endposition: {$gt/*e*/: cursor.position}
				});
				//for each track?
				
				if(instance)
				{
					Session.set("currentlyPlayingVideo", instance);
				}
				else
				{
					Session.set("currentlyPlayingVideo");
				}
			}
		}
	};
	loop.reloop();
	
	Template.track.instances = Instances.find();
	
	Template.track.events =
	{
		"click .instance": function(event)
		{
			Videieio.pause();
			event.stopPropagation();
			Session.set("currentlySelectedVideo", this._id);
		}
	}
	
	Template.timeline.events =
	{
		"click": function()
		{
			Session.set("currentlySelectedVideo", undefined);
		}
	}
	
	Template.track.helpers(
	{
		width: function()
		{
			return this.length * 10 + "px";
		},
		left: function()
		{
			return this.position * 10 + "px";
		},
		backgroundImage: function()
		{
			return "url(videos/" + this.handle + ".jpg)";
		}
	});
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Instances.remove({});
		Cursors.remove({});
	});
}