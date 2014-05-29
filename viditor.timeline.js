Instances = new Meteor.Collection("instances");

if(Meteor.isClient)
{
	Template.track.instances = Instances.find();
	
	Template.track.events =
	{
		"click .instance": function(event)
		{
			Videieio.pause();
			event.stopPropagation();
			Session.set("currentlySelectedVideo", this);
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