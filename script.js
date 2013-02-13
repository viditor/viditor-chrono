var asset =
[{
	idnum: 1,
	position: 25,
	filename: "valley"
},
{
	idnum: 2,
	position: 225,
	filename: "porch"
},
{
	idnum: 3,
	position: 425,
	filename: "room"
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
	if(event.keyCode == 39) {moveAsset(1, 1);}
	if(event.keyCode == 37) {moveAsset(-1, 1);}
	if(event.keyCode == 32) {shiftCursor();}
}, false);

function moveAsset(direction, movement)
{
	var size = accessAsset(asset[cursor].idnum).offsetWidth;
	var position = parsePix(accessAsset(asset[cursor].idnum).style.left);
	
	position += (1 * direction);
	
	if(position < 0) {position = 0;}
	
	if(direction > 0 && cursor < asset.length - 1 && position + size > parsePix(accessAsset(asset[cursor + 1].idnum).style.left)
	|| direction < 0 && cursor > 0 && position < parsePix(accessAsset(asset[cursor - 1].idnum).style.left) + accessAsset(asset[cursor - 1].idnum).offsetWidth)
	{
		if(movement == 1)
		{
			if(direction > 0) {position = parsePix(accessAsset(asset[cursor + 1].idnum).style.left) + accessAsset(asset[cursor + 1].idnum).offsetWidth; asset.swap(cursor, cursor + 1); cursor++;}
			else if(direction < 0) {position = parsePix(accessAsset(asset[cursor - 1].idnum).style.left) - size; asset.swap(cursor, cursor - 1); cursor--;}
		}
		else {position -= (1 * direction);}
	}
	
	accessAsset(asset[cursor].idnum).style.left = position + "px";
}

function shiftCursor()
{
	cursor++;
	if(cursor >= asset.length) {cursor = 0;}
	document.getElementById("cursor").innerHTML = cursor + 1;
}

function parsePix(string) {return parseInt(string.slice(0,-2));}
function accessAsset(idnum) {return document.getElementById("@" + idnum);}
function log(message) {document.getElementById("debug").innerHTML = message;}
Array.prototype.swap = function(a, b) {var temp = this[a]; this[a] = this[b]; this[b] = temp; return this;}