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
	
	onDownstroke: function(event)
	{
		var keycode = event.keyCode;
		
		if(!this.isStroked(keycode))
		{
			this.stroked[keycode] = 1;
			
			if(this.isDownbinded(keycode))
			{
				this.downbinded[keycode]();
			}
		}
		
		if(this.isDownbinded(keycode))
		{
			event.preventDefault();
		}
	},
	
	onUpstroke: function(event)
	{
		var keycode = event.keyCode;
		
		delete this.stroked[keycode];
		
		if(this.isUpbinded(keycode))
		{
			this.upbinded[keycode]();
			event.preventDefault();
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

window.addEventListener("keydown", function(event) {kbdin.onDownstroke(event);}, false);
window.addEventListener("keyup", function(event) {kbdin.onUpstroke(event);}, false);
window.setInterval(function() {kbdin.handleKeystrokes();}, 50);

kbdin.downbindKeystroke(39, function() {moveAsset(RIGHT);});
kbdin.downbindKeystroke(37, function() {moveAsset(LEFT);});
kbdin.downbindKeystroke(16, function() {mode = JUMP; document.getElementById("mode").innerHTML = "Jumpmode";});
kbdin.downbindKeystroke(32, function() {shiftCursor(RIGHT); return;});
kbdin.upbindKeystroke(16, function() {mode = NONE; document.getElementById("mode").innerHTML = "";});