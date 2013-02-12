var asset =
{
	idnum: 1,
	position: 25,
	filename: "valley"
};

window.addEventListener("load", function(event)
{
	document.getElementById("&2").innerHTML += '<asset id="@' + asset.idnum + '"></asset>';
	document.getElementById("@" + asset.idnum).style.backgroundImage = "url('assets/" + asset.filename + ".png')";
	document.getElementById("@" + asset.idnum).style.left = asset.position + "px";
}, false);