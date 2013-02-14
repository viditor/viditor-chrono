var shifting = false;

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