var PIXELS_PER_TIMEBIT = 20;

$(function()
{
	$(".timeline > .asset").draggable(
	{
		stack: ".asset",
		grid: [PIXELS_PER_TIMEBIT, 0]
	});
	
	$(".timeline > .asset").css("position", "absolute");
});