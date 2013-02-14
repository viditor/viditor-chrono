var asset = new Array();

var cursor = 0;

window.addEventListener("load", function(event)
{
	asset[0] = new Asset(1, 25, "valley");
	asset[1] = new Asset(2, 225, "porch");
	asset[2] = new Asset(3, 425, "room");
}, false);

var shifting = false;

JUMP = 1; MOVE = 0;
LEFT = -1; RIGHT = 1;

window.addEventListener("keydown", function(event)
{
	if(event.keyCode == 39) {if(shifting) {moveAsset(RIGHT, JUMP); return;} else {moveAsset(RIGHT, MOVE);} return;}
	else if(event.keyCode == 37) {if(shifting) {moveAsset(LEFT, JUMP); return;} else {moveAsset(LEFT, MOVE);} return;}
	else if(event.keyCode == 16) {shifting = true; log("Jumpmode"); return;}
	else if(event.keyCode == 32) {shiftCursor(RIGHT); return;}
}, false);

window.addEventListener("keyup", function(event)
{
	if(event.keyCode == 16) {shifting = false; log("");}
}, false);

function moveAsset(direction, movement)
{
	asset[cursor].position += (1 * direction);
	
	while(direction > 0 && cursor < asset.length - 1 && asset[cursor].position + asset[cursor].getWidth() > asset[cursor + 1].getPosition()
	   || direction < 0 && cursor > 0                && asset[cursor].position                            < asset[cursor - 1].getPosition() + asset[cursor - 1].getWidth())
	{
		if(movement == 1)
		{
			if(direction > 0) {dominantEdge = asset[cursor + 1].getWidth();}
			else if(direction < 0) {dominantEdge = asset[cursor].getWidth() * -1;}
			
			asset[cursor].position = asset[cursor + direction].getPosition() + dominantEdge;
			asset.swap(cursor, cursor + direction);
			shiftCursor(direction);
		}
		else
		{
			asset[cursor].position -= 1 * direction;
		}
	}
	
	if(asset[cursor].position < 0)
	{
		asset[cursor].position = 0;
	}
	
	asset[cursor].updatePosition();
}

function shiftCursor(direction)
{
	cursor += direction;
	if(cursor >= asset.length) {cursor = 0;}
	if(cursor < 0) {cursor = asset.length - 1;}
	document.getElementById("cursor").innerHTML = cursor + 1;
}

function parsePix(string) {return parseInt(string.slice(0,-2));}
function log(message) {document.getElementById("debug").innerHTML = message;}
Array.prototype.swap = function(a, b) {var temp = this[a]; this[a] = this[b]; this[b] = temp; return this;}