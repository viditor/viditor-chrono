Assets = new Meteor.Collection("assets");

if(Meteor.isClient)
{
	Template.assetlist.assets = function()
	{
		return Assets.find({});
	};
	
	Template.assetlist.events =
	{
		"click .asset": function()
		{
			var _id = Instances.insert({asset: this._id, handle: this.handle, length: this.length, position: 0});
			Session.set("currentlyPlayingVideo", _id);
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Assets.remove({});
		Assets.insert({name: "SnowyFlag", handle: "snowing", type: "video", length: 13});
		Assets.insert({name: "ChildrenLaughing", handle: "children", type: "audio", length: 9});
		Assets.insert({name: "InTheCarOnTheRoad", handle: "inthecar", type: "video", length: 36});
	});
}