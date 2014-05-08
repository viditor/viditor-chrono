$(document).ready(function()
{
	var inthecar = new Assetfile("videos/inthecar", 36).viditize(0);
	var children = new Assetfile("videos/children", 9).viditize(38);
	var snowing = new Assetfile("videos/snowing", 14).viditize(49);
	
	Timeline.firstViditbit.nextViditbit = inthecar;
	
	inthecar.previousViditbit = Timeline.firstViditbit;
	inthecar.nextViditbit = children;
	
	children.previousViditbit = inthecar;
	children.nextViditbit = snowing;
	
	snowing.previousViditbit = children;
	snowing.nextViditbit = Timeline.lastViditbit;
	
	Timeline.lastViditbit.previousViditbit = snowing;
	
	$(".track").first().append(inthecar.getDOM());
	$(".track").first().append(children.getDOM());
	$(".track").first().append(snowing.getDOM());
	
	Timeline.getFirstViditbit().setAsVideo();
	Videoplayer.loadAndPlay();
	
	$("video").prop("muted", true);
	
	$("video").on("timeupdate", function()
	{
		var currentTime = $(this).get(0).currentTime;
		var endTime = Timeline.getCurrentViditbit().getEndTime();
		
		if(currentTime >= endTime)
		{
			console.log("HELLO WORLD!");
			
			if(Timeline.hasNextViditbit())
			{
				Timeline.getNextViditbit().setAsVideo();
				Videoplayer.loadAndPlay();
			}
		}
	});
	
	$("#videoplayer > #control_panel > #play_button").on("click", function()
	{
		Videoplayer.pauseplay();
	});
	
	$("#videoplayer > video").on("click", function()
	{
		Videoplayer.pauseplay();
	});
});