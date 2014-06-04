Instances = new Meteor.Collection("instances");

if(Meteor.isClient)
{
	Session.setDefault("cursor", {position: 0, playing: false});
	
	Template.timeline.cursor = function()
	{
		return Session.get("cursor");
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
		var cursor = Session.get("cursor");
		if(cursor.playing)
		{
			clock += loop.framerate.getCurrent();
			if(clock > 1000)
			{
				cursor.position++;
				Session.set("cursor", cursor);
				
				clock -= 1000;
			}
			
			var instance = Instances.findOne({position: cursor.position});
			//console.log(instance);
			if(instance)
			{
				Session.set("currentlyPlayingVideo", instance);
			}
			else
			{
				Session.set("currentlyPlayingVideo");
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
	});
}