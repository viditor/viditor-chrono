if(Meteor.isClient)
{
	Template.ctrlpane.title = function()
	{
		return "End-of-the-Year Project";
	};
	
	Template.ctrlpane.events(
	{
		"click #title": function()
		{
			console.log("rename the project");
		},
		"click .menu": function()
		{
			console.log("access a menu");
		},
		"click #new.user": function()
		{
			console.log("share with a new user");
		}
	});
}