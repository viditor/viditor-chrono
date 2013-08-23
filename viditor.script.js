var PIXELS_PER_TIMEBIT = 20;

$(function()
{
	$(".asset").draggable(
	{
		stack: ".asset",
		grid: [PIXELS_PER_TIMEBIT, 0]
	});
	
	$(".asset").css("position", "absolute");
});