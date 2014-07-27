if(Meteor.isClient)
{
	Template.viditor.project = function()
	{
		return true; //Session.get("project");
	}
}