var Orsuts = new Meteor.Collection("orsuts");

if(Meteor.isClient)
{
	Template.track.orsuts = Orsuts.find();
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Orsuts.remove({});
		Orsuts.insert({handle: "snowing", position: 100, length: 100});
	});
}