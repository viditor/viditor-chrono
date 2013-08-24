var PIXELS_PER_TIMEBIT = 20;

$(function()
{
	$(".explorer > .asset").draggable(
	{
		scroll: false,
		stack: ".asset",
		helper: "clone",
		revert: "invalid"
	});
	
	$(".timeline").droppable(
	{
		accept: ".explorer > .asset",
		drop: function(event, element)
		{
			data = new Object();
			data.instanceidnum = new Date().getTime();
			data.horizposition = Math.floor((element.position.left / PIXELS_PER_TIMEBIT) + 0.5);
			data.color = $(element.draggable).css("background-color");
			
			instantiateAsset(data);
		}
	});
});

function instantiateAsset(data)
{
	$asset = $("<div></div>");
	$asset.attr("class", "asset");
	$asset.attr("id", data.instanceidnum);
	$asset.css("left", data.horizposition * PIXELS_PER_TIMEBIT);
	$asset.css("position", "absolute");
	$asset.css("background-color", data.color);

	$asset.draggable(
	{
		stack: ".asset",
		grid: [PIXELS_PER_TIMEBIT, 0]
	});

	$(".timeline").append($asset);
}