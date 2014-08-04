if(Meteor.isClient)
{
	Template.menubar.events =
	{
		"click #delete": function()
		{
			var clip_id = Session.get("selected clip_id");
			Clips.remove(clip_id);
			Session.set("selected clip_id", undefined);
		}
	}
}