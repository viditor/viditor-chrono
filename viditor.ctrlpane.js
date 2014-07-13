if(Meteor.isClient)
{
	Template.ctrlpane.title = function()
	{
		return "End-of-the-Year Project";
	};
	
	Template.ctrlpane.events(
	{
		"click #title": function(event)
		{
			var dropDown = $(event.target).parent().find(".drop-down");
			dropDown.toggleClass("visible");
		},
		"click .menu": function()
		{
			console.log("access a menu");
		},
		"click #new": function()
		{
			console.log("share with a new user");
		}
	});
}
