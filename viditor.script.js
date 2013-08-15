var PIXELS_IN_TIMEBIT = 20;

var assets = {};
assets[0] = {color: "red", horizposition: 0 / PIXELS_IN_TIMEBIT};
assets[1] = {color: "blue", horizposition: 100 / PIXELS_IN_TIMEBIT};
assets[2] = {color: "green", horizposition: 200 / PIXELS_IN_TIMEBIT};

$(function()
{
	for(var idnum in assets)
	{
		$asset = $("<div></div>");
		$asset.css("background-color", assets[idnum].color);
		$asset.attr("class", "asset"); $asset.attr("id", idnum);
		$asset.css("left", assets[idnum].horizposition * PIXELS_IN_TIMEBIT);
		$asset.css("position", "absolute");
		$asset.draggable(
		{
			stack: ".asset",
			grid: [PIXELS_IN_TIMEBIT, 0],
			stop: function(event, element)
			{
				assets[$(this).attr("id")].horizposition = element.position.left / PIXELS_IN_TIMEBIT;
				console.log(assets[$(this).attr("id")]);
			}
		})
		
		$("body").append($asset);
	}
	
	$(document).mousewheel(function(event, delta)
	{
		$(".asset").each(function()
		{
			if(delta > 0)
			{
				$(this).css("left", $(this).position().left * 2);
				$(this).css("width", $(this).width() * 2);
			}
			else if(delta < 0)
			{
				$(this).css("left", $(this).position().left / 2);
				$(this).css("width", $(this).width() / 2);
			}
		});
	});
});