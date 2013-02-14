var shifting = false;

var kbdin = 
{
	stroked: new Object(),
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
	
	isStroked: function(keycode)
	{
		return this.stroked[keycode];
	},
	
	onDownstroke: function(keycode)
	{
		if(!this.isStroked(keycode))
		{
			this.stroked[keycode] = 1;
			
			if(this.isDownbinded(keycode))
			{
				this.downbinded[keycode]();
			}
		}
	},
	
	onUpstroke: function(keycode)
	{
		delete this.stroked[keycode];
		
		if(this.isUpbinded(keycode))
		{
			this.upbinded[keycode]();
		}
	},
	
	handleKeystrokes: function()
	{
		for(var keycode in this.downbinded)
		{
			if(this.isStroked(keycode))
			{
				this.downbinded[keycode]();
			}
		}
	}
}

window.addEventListener("keydown", function(event) {kbdin.onDownstroke(event.keyCode);}, false);
window.addEventListener("keyup", function(event) {kbdin.onUpstroke(event.keyCode);}, false);
window.setInterval(function() {kbdin.handleKeystrokes();}, 50);

kbdin.downbindKeystroke(39, function() {if(shifting) {moveAsset(RIGHT, JUMP); return;} else {moveAsset(RIGHT, MOVE);}});
kbdin.downbindKeystroke(37, function() {if(shifting) {moveAsset(LEFT, JUMP); return;} else {moveAsset(LEFT, MOVE);}});
kbdin.downbindKeystroke(16, function() {shifting = true; log("Jumpmode");});
kbdin.downbindKeystroke(32, function() {shiftCursor(RIGHT); return;});
kbdin.upbindKeystroke(16, function() {shifting = false; log("");});