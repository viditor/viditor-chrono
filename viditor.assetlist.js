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
		Assets.insert({name: "SnowyFlag", thumbnail: "url(videos/snowing.jpg)", type: "video"});
		Assets.insert({name: "ChildrenLaughing", thumbnail: "url(videos/children.jpg)", type: "audio"});
		Assets.insert({name: "InTheCarOnTheRoad", thumbnail: "url(videos/inthecar.jpg)", type: "video"});
	});
}