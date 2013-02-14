var shifting = false;

var kbdin = 
{
	binded: new Object(),
	
	bindKeystroke: function(keycode, functionality)
	{
		this.binded[keycode] = functionality;
	},
	
	isBinded: function(keycode)
	{
		return this.binded[keycode];
	}
}

window.addEventListener("keydown", function(event)
{
	if(kbdin.isBinded(event.keyCode))
	{
		kbdin.binded[event.keyCode]();
	}
}, false);

window.addEventListener("keyup", function(event)
{
	if(event.keyCode == 16) {shifting = false; log("");}
}, false);

kbdin.bindKeystroke(39, function() {if(shifting) {moveAsset(RIGHT, JUMP); return;} else {moveAsset(RIGHT, MOVE);}});
kbdin.bindKeystroke(37, function() {if(shifting) {moveAsset(LEFT, JUMP); return;} else {moveAsset(LEFT, MOVE);}});
kbdin.bindKeystroke(16, function() {shifting = true; log("Jumpmode");});
kbdin.bindKeystroke(32, function() {shiftCursor(RIGHT); return;});