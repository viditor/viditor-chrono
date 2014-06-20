Projects = new Meteor.Collection("projects");

if(Meteor.isClient)
{
	Template.dashboard.events =
	{
		"click a": function()
		{
			Session.set("project", true);
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Projects.remove({});
		//Projects.insert({});
	});
}