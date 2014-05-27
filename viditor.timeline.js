var Instances = new Meteor.Collection("instances");

if(Meteor.isClient)
{
	Template.track.instances = Instances.find();
	
	Template.track.events =
	{
		"click .instance": function()
		{
			Instances.update(this._id, {$inc: {position: 100}});
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Instances.remove({});
		Instances.insert({handle: "snowing", position: 100, length: 100});
	});
}