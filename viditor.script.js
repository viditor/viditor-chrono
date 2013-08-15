var undo = [];
var redo = [];

var selected = [];

var UNIT_OF_TIME = 20;

var assets =
[
	{color: "red", horizposition: 0 / UNIT_OF_TIME},
	{color: "blue", horizposition: 100 / UNIT_OF_TIME},
	{color: "green", horizposition: 200 / UNIT_OF_TIME}
];

$(function()
{
	for(var idnum in assets)
	{
		$asset = $("<div></div>");
		$asset.attr("class", "asset"); $asset.attr("id", idnum);
		$asset.css("background-color", assets[idnum].color);
		$asset.css("left", assets[idnum].horizposition * UNIT_OF_TIME);
		$asset.draggable(
		{
			grid: [UNIT_OF_TIME, 0],
			stack: ".asset",
			start: function(event, element)
			{
				$(this).css("opacity", "1");
				selected[$(this).attr("id")] = true;
			},
			stop: function(event, element)
			{
				for(var idnum in selected)
				{
					if(idnum != $(this).attr("id"))
					{
						$("#" + idnum).css("left", $("#" + idnum).position().left + element.position.left - element.originalPosition.left);
					}
				}
				
				repositioning = {};
				repositioning.instantiationidnum = $(this).attr("id");
				repositioning.horizposition = Math.floor(element.originalPosition.left / UNIT_OF_TIME + 0.5);
				undo.push(repositioning);
			}
		}).click(function()
		{
			if($(this).css("opacity") < 1)
			{
				$(this).css("opacity", "1");
				selected[$(this).attr("id")] = true;
			}
			else
			{
				$(this).css("opacity", "");
				delete selected[$(this).attr("id")];
			}
		});
		
		$("body").append($asset);
	}
	
	$(document).keydown(function(event)
	{
		if(event.keyCode == 90 && event.ctrlKey)
		{
			if(undo.length > 0)
			{
				toundo = undo.pop();
				
				toredo = {};
				toredo.instantiationidnum = toundo.instantiationidnum;
				
				if(toundo.horizposition != null)
				{
					toredo.horizposition = Math.floor($("#" + toundo.instantiationidnum).position().left / UNIT_OF_TIME + 0.5);
					$("#" + toundo.instantiationidnum).css("left", toundo.horizposition * UNIT_OF_TIME);
				}
				
				redo.push(toredo);
			}
		}
		else if(event.keyCode == 89 && event.ctrlKey)
		{
			if(redo.length > 0)
			{
				toredo = redo.pop();
				
				toundo = {};
				toundo.instantiationidnum = toredo.instantiationidnum;
				
				if(toredo.horizposition != null)
				{
					toundo.horizposition = Math.floor($("#" + toredo.instantiationidnum).position().left / UNIT_OF_TIME + 0.5);
					$("#" + toredo.instantiationidnum).css("left", toredo.horizposition * UNIT_OF_TIME);
				}
				
				undo.push(toundo);
			}
		}
	});
});