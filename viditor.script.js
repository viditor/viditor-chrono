$(document).ready(function()
{
	var red = new Vidit({color: "red", length: 6}, 6);
	var blue = new Vidit({color: "blue", length: 12}, 18);
	var green = new Vidit({color: "green", length: 18}, 36);
	
	red.getDOM().appendTo("#timeline");
	blue.getDOM().appendTo("#timeline");
	green.getDOM().appendTo("#timeline");
});