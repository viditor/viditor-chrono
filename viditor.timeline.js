Instances = new Meteor.Collection("instances");

if(Meteor.isClient)
{
	Template.track.instances = Instances.find();
	
	Template.track.events =
	{
		"click .instance": function()
		{
			Videieio.pause();
			Instances.update(this._id, {$inc: {position: 5}});
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