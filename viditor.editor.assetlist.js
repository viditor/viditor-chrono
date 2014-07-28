Assets = new Meteor.Collection("assets");

if(Meteor.isClient)
{
	Template.assetlist.assets = function()
	{
		return Assets.find({});
	}
	
	Template.assetlist.events =
	{
		"click #add.asset": function(event)
		{
			var color = prompt("Provide the name of a color.");
			Assets.insert({title: "i am " + color, color: color, length: 5});
		}
	}
}