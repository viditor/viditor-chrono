if(Meteor.isClient)
{
	Template.viditor.project = function()
	{
		return Session.get("project");
	}
}