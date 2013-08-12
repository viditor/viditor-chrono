var undo = [];
var redo = [];

var selected = [];

var assets =
[
	{color: "red", horizposition: 0 / 16},
	{color: "blue", horizposition: 128 / 16},
	{color: "green", horizposition: 256 / 16}
];

$(function()
{
	for(var idnum in assets)
	{
		$asset = $("<div></div>");
		$asset.attr("class", "asset"); $asset.attr("id", idnum);
		$asset.css("background-color", assets[idnum].color);
		$asset.css("left", assets[idnum].horizposition * 16);
		$asset.draggable(
		{
			grid: [16, 0],
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
				repositioning.horizposition = Math.floor(element.originalPosition.left / 16 + 0.5);
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
					toredo.horizposition = Math.floor($("#" + toundo.instantiationidnum).position().left / 16 + 0.5);
					$("#" + toundo.instantiationidnum).css("left", toundo.horizposition * 16);
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
					toundo.horizposition = Math.floor($("#" + toredo.instantiationidnum).position().left / 16 + 0.5);
					$("#" + toredo.instantiationidnum).css("left", toredo.horizposition * 16);
				}
				
				undo.push(toundo);
			}
		}
	});
});