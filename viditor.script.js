$(document).ready(function()
{
	var red = new Vidit({color: "red", length: 6}, 6);
	var blue = new Vidit({color: "blue", length: 12}, 18);
	var green = new Vidit({color: "green", length: 18}, 36);
	
	$(".track").first().append(red.getDOM());
	$(".track").first().append(blue.getDOM());
	$(".track").first().append(green.getDOM());
});