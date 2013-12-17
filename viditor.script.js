$(document).ready(function()
{
	var inthecar = new Assetfile("videos/inthecar", 36).viditize(0);
	var children = new Assetfile("videos/children", 9).viditize(38);
	var snowing = new Assetfile("videos/snowing", 14).viditize(49);
	
	$(".track").first().append(inthecar.getDOM());
	$(".track").first().append(children.getDOM());
	$(".track").first().append(snowing.getDOM());
	
	inthecar.setAsVideo();
	$("video").get(0).load();
	$("video").get(0).play();
});