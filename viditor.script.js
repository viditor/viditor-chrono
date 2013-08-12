var undo = [];

$(function()
{
	$(".asset").draggable(
	{
		grid: [16, 0],
		stack: ".asset",
		stop: function(event, element)
		{
			repositioning = {};
			repositioning.instantiationidnum = $(this).attr("id");
			repositioning.horizposition = Math.floor(element.originalPosition.left / 16 + 0.5);
			undo.push(repositioning);
		}
	});
	
	$(document).keydown(function(event)
	{
		if(event.keyCode == 90 && event.ctrlKey)
		{
			if(undo.length > 0)
			{
				toundo = undo.pop();
				if(toundo.horizposition != null)
				{
					$("#" + toundo.instantiationidnum).css("left", toundo.horizposition * 16);
				}
			}
		}
	});
});