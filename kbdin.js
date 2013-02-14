var shifting = false;

var kbdin = 
{
	upbinded: new Object(),
	downbinded: new Object(),
	
	downbindKeystroke: function(keycode, functionality)
	{
		this.downbinded[keycode] = functionality;
	},
	
	upbindKeystroke: function(keycode, functionality)
	{
		this.upbinded[keycode] = functionality;
	},
	
	isDownbinded: function(keycode)
	{
		return this.downbinded[keycode];
	},
	
	isUpbinded: function(keycode)
	{
		return this.upbinded[keycode];
	},
	
	onDownstroke: function(keycode)
	{
		if(this.isDownbinded(keycode))
		{
			this.downbinded[keycode]();
		}
	},
	
	onUpstroke: function(keycode)
	{
		if(this.isUpbinded(keycode))
		{
			this.upbinded[keycode]();
		}
	}
}

window.addEventListener("keydown", function(event) {kbdin.onDownstroke(event.keyCode);}, false);
window.addEventListener("keyup", function(event) {kbdin.onUpstroke(event.keyCode);}, false);

kbdin.downbindKeystroke(39, function() {if(shifting) {moveAsset(RIGHT, JUMP); return;} else {moveAsset(RIGHT, MOVE);}});
kbdin.downbindKeystroke(37, function() {if(shifting) {moveAsset(LEFT, JUMP); return;} else {moveAsset(LEFT, MOVE);}});
kbdin.downbindKeystroke(16, function() {shifting = true; log("Jumpmode");});
kbdin.downbindKeystroke(32, function() {shiftCursor(RIGHT); return;});
kbdin.upbindKeystroke(16, function() {shifting = false; log("");});