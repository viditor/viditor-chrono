if(Meteor.isClient)
{
	Template.dashboard.assets = function()
	{
		return [
			{
				ytid: "XOC3vixnj_0"
			},
			{
				ytid: "rDjrOaoHz9s"
			}
		];
	}
	
	Template.dashboard.selection = function()
	{
		return Session.get("selection");
	}
	
	Template.dashboard.events =
	{
		"click li": function(event)
		{
			event.preventDefault();
			Session.set("selection", this);
		},
		"click #abort-preview": function(event)
		{
			Session.set("selection", undefined);
		}
	}
}