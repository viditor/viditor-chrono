var shifting = false;

var kbdin = 
{
	upbinded: new Object(),
	downbinded: new Object(),
	
	downbindKeystroke: function(keycode, functionality)
	{
		this.downbinded[keycode] = functionality;
	},
	
	isDownbinded: function(keycode)
	{
		return this.downbinded[keycode];
	},
	
	upbindKeystroke: function(keycode, functionality)
	{
		this.upbinded[keycode] = functionality;
	},
	
	isUpbinded: function(keycode)
	{
		return this.upbinded[keycode];
	}
}

window.addEventListener("keydown", function(event)
{
	if(kbdin.isDownbinded(event.keyCode))
	{
		kbdin.downbinded[event.keyCode]();
	}
}, false);

window.addEventListener("keyup", function(event)
{
	if(kbdin.isUpbinded(event.keyCode))
	{
		kbdin.upbinded[event.keyCode]();
	}
}, false);

kbdin.downbindKeystroke(39, function() {if(shifting) {moveAsset(RIGHT, JUMP); return;} else {moveAsset(RIGHT, MOVE);}});
kbdin.downbindKeystroke(37, function() {if(shifting) {moveAsset(LEFT, JUMP); return;} else {moveAsset(LEFT, MOVE);}});
kbdin.downbindKeystroke(16, function() {shifting = true; log("Jumpmode");});
kbdin.downbindKeystroke(32, function() {shiftCursor(RIGHT); return;});
kbdin.upbindKeystroke(16, function() {shifting = false; log("");});