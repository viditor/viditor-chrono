var Assets = new Meteor.Collection("assets");

if(Meteor.isClient)
{
	Template.assetlist.assets = function()
	{
		return Assets.find({});
	};
	
	/*Template.assetlist.events = {
		"click .asset": function()
		{
			console.log(this);
		}
	}*/
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Assets.remove({});
		Assets.insert({name: "SnowyFlag", handle: "snowing", type: "video"});
		Assets.insert({name: "ChildrenLaughing", handle: "children", type: "audio"});
		Assets.insert({name: "InTheCarOnTheRoad", handle: "inthecar", type: "video"});
	});
}