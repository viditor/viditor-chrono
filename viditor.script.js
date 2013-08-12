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
			repositioning.horizposition = Math.ceil(element.originalPosition.left / 16) * 16;
			repositioning.instantiationidnum = $(this).attr("id");
			undo.push(repositioning);
		}
	});
});