$(document).ready(function()
{
	$("#ctrlpane").find("#title > h1").on("click", function()
	{
		console.log("rename the project?");
	});
	
	$("#ctrlpane").find("#new.user").on("click", function()
	{
		console.log("add another user?");
	});
	
	$("#ctrlpane").find("#menus > span").on("click", function()
	{
		console.log("access a menu");
	});
});