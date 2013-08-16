var PIXELS_IN_TIMEBIT = 20;

var scope = 1;

var assets = {};
assets[0] = {color: "red", horizposition: 0 / PIXELS_IN_TIMEBIT, currentlength: 100 / PIXELS_IN_TIMEBIT};
assets[1] = {color: "blue", horizposition: 100 / PIXELS_IN_TIMEBIT, currentlength: 100 / PIXELS_IN_TIMEBIT};
assets[2] = {color: "green", horizposition: 200 / PIXELS_IN_TIMEBIT, currentlength: 100 / PIXELS_IN_TIMEBIT};

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
				assets[$(this).attr("id")].horizposition = Math.ceil((element.position.left / scope) / PIXELS_IN_TIMEBIT);
				console.log(assets[$(this).attr("id")]);
			}
		})
		
		$("body").append($asset);
	}
	
	$(document).mousewheel(function(event, delta)
	{
		if(delta > 0)
		{
			scope++;
		}
		else if(delta < 0)
		{
			scope--;
		}
		
		$(".asset").each(function()
		{
			$(this).css("left", (assets[$(this).attr("id")].horizposition * scope) * PIXELS_IN_TIMEBIT);
			$(this).css("width", (assets[$(this).attr("id")].currentlength * scope) * PIXELS_IN_TIMEBIT);
		});
	});
});