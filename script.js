var asset =
[{
	idnum: 1,
	position: 25,
	filename: "valley"
}];

var cursor = 0;

window.addEventListener("load", function(event)
{
	for(var num = 0; num < asset.length; num++)
	{
		document.getElementById("&2").innerHTML += '<asset id="@' + asset[num].idnum + '"></asset>';
		accessAsset(asset[num].idnum).style.backgroundImage = "url('assets/" + asset[num].filename + ".png')";
		accessAsset(asset[num].idnum).style.left = asset[num].position + "px";
	}
}, false);

window.addEventListener("keydown", function(event)
{
	if(event.keyCode == 39) {moveAsset(1);}
	if(event.keyCode == 37) {moveAsset(-1);}
}, false);

function moveAsset(direction)
{
	var position = parsePix(accessAsset(asset[cursor].idnum).style.left);
	accessAsset(asset[cursor].idnum).style.left = position + (1 * direction) + "px";
	
	var position = parsePix(accessAsset(asset[cursor].idnum).style.left);
	if(position < 0) {accessAsset(asset[cursor].idnum).style.left = "0px";}
}

function parsePix(string) {return parseInt(string.slice(0,-2));}
function accessAsset(idnum) {return document.getElementById("@" + idnum);}
function log(message) {document.getElementById("debug").innerHTML = message;}