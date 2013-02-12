var asset =
{
	idnum: 1,
	position: 25,
	filename: "valley"
};

window.addEventListener("load", function(event)
{
	document.getElementById("&2").innerHTML += '<asset id="@' + asset.idnum + '"></asset>';
	accessAsset(asset.idnum).style.backgroundImage = "url('assets/" + asset.filename + ".png')";
	accessAsset(asset.idnum).style.left = asset.position + "px";
}, false);

window.addEventListener("keydown", function(event)
{
	if(event.keyCode == 39)
	{
		var position = parsePix(accessAsset(asset.idnum).style.left);
		accessAsset(asset.idnum).style.left = position + 1 + "px";
	}
}, false);

function parsePix(string) {return parseInt(string.slice(0,-2));}
function accessAsset(idnum) {return document.getElementById("@" + idnum);}