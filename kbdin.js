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
			if(this.isStroked(keycode) > 5)
			{
				this.downbinded[keycode]();
			}
		}
		
		for(var keycode in this.stroked)
		{
			this.stroked[keycode]++;
		}
	}
}

window.addEventListener("keydown", function(event) {kbdin.onDownstroke(event.keyCode);}, false);
window.addEventListener("keyup", function(event) {kbdin.onUpstroke(event.keyCode);}, false);
window.setInterval(function() {kbdin.handleKeystrokes();}, 50);

kbdin.downbindKeystroke(39, function() {moveAsset(RIGHT);});
kbdin.downbindKeystroke(37, function() {moveAsset(LEFT);});
kbdin.downbindKeystroke(16, function() {mode = JUMP; log("Jumpmode");});
kbdin.downbindKeystroke(32, function() {shiftCursor(RIGHT); return;});
kbdin.upbindKeystroke(16, function() {mode = NONE; log("");});