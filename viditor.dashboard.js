if(Meteor.isClient)
{
	Template.dashboard.assets = function()
	{
		return [
			{
				ytid: "iJKU-w4pK1M"
			},
			{
				ytid: "2aEsr_2Cfp4",
			}
		];
	}
	
	Template.dashboard.selection = function()
	{
		return Session.get("selection");
	}
	
	Template.dashboard.events =
	{
		"click li": function()
		{
			Session.set("selection", this);
		},
		"click #abort-preview": function()
		{
			Session.set("selection", undefined);
		}
	}
	
	Meteor.startup(function()
	{
		Deps.autorun(function()
		{
			if(Session.get("selection") != undefined)
			{
				$("video").get(0).load();
			}
		});
	});
}