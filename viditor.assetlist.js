Assets = new Meteor.Collection("assets");

if(Meteor.isClient)
{
	Template.assetlist.assets = function()
	{
		return Assets.find();
	}
	
	Template.assetlist.events =
	{
		"click .asset": function()
		{
			var _id = Instances.insert({asset: this._id, handle: this.handle, length: this.length, position: 0, endposition: this.length, track: 1, left_trim: 0, right_trim: 0});
		},
		"submit input": function()
		{
			console.log("okay");
		}
	}
	
	Meteor.startup(function()
	{
		$(document).ready(function()
		{
			$("form#ytdl").submit(function(event)
			{
				event.preventDefault();
				
				var value = $(this).find("input").val();
				
				HTTP.post("http://viditor.us:8080/v1/youtube/" + value, function(error, response)
				{
					if(error)
					{
						console.log(error);
					}
					else
					{
						Assets.insert({
							handle: response.data.ytid,
							length: response.data.length,
							title: response.data.title,
							type: "video"
						});
					}
				});
			});
		});
	});
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Assets.remove({});
		
		HTTP.get("http://viditor.us:8080/v1/youtube", function(error, response)
		{
			if(error)
			{
				console.log(error);
			}
			else
			{
				for(var index in response.data)
				{
					Assets.insert({
						handle: response.data[index].ytid,
						length: response.data[index].length,
						title: response.data[index].title,
						type: "video"
					});
				}
			}
		});
	});
}
