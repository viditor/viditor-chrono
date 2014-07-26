

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
				$("video").find("source#mp4").attr("src", "http://viditor.us:8080/v1/youtube/" + selection.ytid + ".mp4");
				$("video").find("source#webm").attr("src", "http://viditor.us:8080/v1/youtube/" + selection.ytid + ".webm");
				$("video").find("source#ogv").attr("src", "http://viditor.us:8080/v1/youtube/" + selection.ytid + ".ogv");
				$("video").get(0).load();
			}
		});
	});
}