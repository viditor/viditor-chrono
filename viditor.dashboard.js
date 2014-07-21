//Projects = new Meteor.Collection("projects");

if(Meteor.isClient)
{
	var url = "127.0.0.1:8080/v1/youtube";
	HTTP.call("GET", url, function(result)
	{
		console.log(result.content);
	});
}

if(Meteor.isServer)
{
	/*Meteor.startup(function()
	{
		Projects.remove({});
	});*/
}