$(document).ready(function()
{
	var inthecar = new Assetfile("videos/inthecar", 36).viditize(0);
	var children = new Assetfile("videos/children", 9).viditize(38);
	var snowing = new Assetfile("videos/snowing", 14).viditize(49);
	
	Timeline.firstVidit.nextVidit = inthecar;
	inthecar.previousVidit = Timeline.firstVidit;
	inthecar.nextVidit = children;
	children.previousVidit = inthecar;
	children.nextVidit = snowing;
	snowing.previousVidit = children;
	snowing.nextVidit = Timeline.lastVidit;
	
	$(".track").first().append(inthecar.getDOM());
	$(".track").first().append(children.getDOM());
	$(".track").first().append(snowing.getDOM());
	
	Timeline.getFirstVidit().setAsVideo();
	$("video").get(0).load();
	$("video").get(0).play();
	
	$("video").on("timeupdate", function()
	{
		var currentTime = $(this).get(0).currentTime;
		var endTime = Timeline.getCurrentVidit().getEndTime();
		
		if(currentTime >= endTime)
		{
			if(Timeline.hasNextVidit())
			{
				Timeline.getNextVidit().setAsVideo();
				$("video").get(0).load();
				$("video").get(0).play();
			}
		}
	});
});