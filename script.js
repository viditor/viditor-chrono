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
	if(event.keyCode == 32) {shiftCursor(1);}
}, false);

function moveAsset(direction, movement)
{
	var you = accessAsset(asset[cursor].idnum);
	var yourPosition = parsePix(accessAsset(asset[cursor].idnum).style.left);
	var oldPosition = yourPosition;
	var oldCursor = cursor;
	
	var him;
	var hisPosition;
	
	var cursorEdge;
	var dominantEdge;
	var nondominantEdge;
	
	if(direction > 0 && cursor < asset.length - 1)
	{
		cursorEdge = asset.length - 1;
		
		him = accessAsset(asset[cursor + direction].idnum);
		hisPosition = parsePix(him.style.left);
		
		nondominantEdge = you.offsetWidth;
		dominantEdge = him.offsetWidth;
	}
	else if(direction < 0 && cursor > 0)
	{
		cursorEdge = 0;
		
		him = accessAsset(asset[cursor + direction].idnum);
		hisPosition = parsePix(him.style.left);
		
		nondominantEdge = -him.offsetWidth;
		dominantEdge = -you.offsetWidth;
	}
	
	yourPosition += (1 * direction);
	
	if(yourPosition < 0) {yourPosition = 0;}
	
	while(direction > 0 && cursor < asset.length - 1 && yourPosition + you.offsetWidth > parsePix(accessAsset(asset[cursor + 1].idnum).style.left)
	   || direction < 0 && cursor > 0             && yourPosition                   < parsePix(accessAsset(asset[cursor - 1].idnum).style.left) + accessAsset(asset[cursor - 1].idnum).offsetWidth)
	{
		if(movement == 1)
		{
			if(direction > 0) {dominantEdge = accessAsset(asset[cursor + 1].idnum).offsetWidth;}
			else if(direction < 0) {dominantEdge = -you.offsetWidth;}
			
			if(parsePix(accessAsset(asset[cursor + direction].idnum).style.left) + dominantEdge > 0)
			{
				yourPosition = parsePix(accessAsset(asset[cursor + direction].idnum).style.left) + dominantEdge;
				asset.swap(cursor, cursor + direction);
				shiftCursor(direction);
			}
			else
			{
				yourPosition = oldPosition;
				cursor = oldCursor;
				document.getElementById("cursor").innerHTML = cursor + 1;
			}
			
		}
		else
		{
			yourPosition -= 1 * direction;
		}
	}
	
	accessAsset(asset[cursor].idnum).style.left = yourPosition + "px";
}

function shiftCursor(direction)
{
	cursor += direction;
	if(cursor >= asset.length) {cursor = 0;}
	if(cursor < 0) {cursor = asset.length - 1;}
	document.getElementById("cursor").innerHTML = cursor + 1;
}

function parsePix(string) {return parseInt(string.slice(0,-2));}
function accessAsset(idnum) {return document.getElementById("@" + idnum);}
function log(message) {document.getElementById("debug").innerHTML = message;}
Array.prototype.swap = function(a, b) {var temp = this[a]; this[a] = this[b]; this[b] = temp; return this;}
function compare(a, b, op) {if(op > 0) {return a > b;} else if(op < 0) {return a < b;} else {return a == b;}}