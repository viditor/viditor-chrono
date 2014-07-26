

if(Meteor.isClient)
{
	Session.set("selection", undefined);
	
	Template.dashboard.assets = function()
	{
		return Assets.find({}, {sort: {ytid: 1}});
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
				var video = $("video").get(0);
				if(video != undefined) {video.load();}
			}
		});
	});
}