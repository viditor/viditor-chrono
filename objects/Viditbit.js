var Viditbit = function(assetfile, tick, track, trim)
{
	this.assetfile = assetfile;
	
	this.trim = {left: 0, right: 0};
	this.position = {tick: 0, track: 0};
	if(tick) {this.position.tick = tick;}
	if(track) {this.position.track = track;}
	
	this.dom = $("<div></div>");
	this.dom.data("viditbit", this);
	this.dom.attr("class", "viditbit");
	this.dom.css(this.getDefaultCSS());
	this.dom.draggable(this.getDraggable());
	this.dom.resizable(this.getResizable());
}

var PIXELS_PER_TICK = 10;
var SECONDS_PER_TICK = 2;

Viditbit.prototype.getOriginalLength = function()
{
	return this.assetfile.getLength();
}

Viditbit.prototype.getTrimmedLength = function()
{
	return this.assetfile.getLength() - this.getRightTrim() - this.getLeftTrim();
}

Viditbit.prototype.getRightTrim = function()
{
	return this.trim.right;
}

Viditbit.prototype.getLeftTrim = function()
{
	return this.trim.left;
}

Viditbit.prototype.getTickPosition = function()
{
	return this.position.tick;
}

Viditbit.prototype.getTrackPosition = function()
{
	return this.position.track;
}

Viditbit.prototype.getDefaultCSS = function()
{
	var css = new Object();
	
	css.position = "absolute";
	css.backgroundImage = this.assetfile.getImageURL();
	css.left = Math.ceil(this.getTickPosition() / SECONDS_PER_TICK) * PIXELS_PER_TICK;
	css.width = Math.ceil(this.getTrimmedLength() / SECONDS_PER_TICK) * PIXELS_PER_TICK;
	
	return css;
}

Viditbit.prototype.getDOM = function()
{
	return this.dom;
}

Viditbit.prototype.getDraggable = function()
{
	var draggable = new Object();
	
	draggable.scroll = true;
	draggable.scrollSpeed = 10;
	draggable.scrollSensitivity = 40;
	draggable.containment = "#timeline";
	draggable.grid = [PIXELS_PER_TICK, 0];
	
	/*draggable.drag = function(event, element)
	{
		$(this).data("viditbit").position.tick = pixel2sec(element.position.left);
		
		if($(this).next().length)
		{
			if($(this).position().left > $(this).next().position().left)
			{
				$(this).insertAfter($(this).next());
			}
		}
		
		if($(this).prev().length)
		{
			if($(this).position().left < $(this).prev().position().left)
			{
				$(this).insertBefore($(this).prev());
			}
		}
	}*/
	
	/*draggable.stop = function()
	{
		if($(this).data("viditbit").getPreviousViditbit().dom)
		{
			console.log($(this).data("viditbit").getPreviousViditbit().dom[0]);
		}
		else
		{
			console.log(undefined);
		}
		
		if($(this).data("viditbit").getNextViditbit().dom)
		{
			console.log($(this).data("viditbit").getNextViditbit().dom[0]);
		}
		else
		{
			console.log(undefined);
		}
	}*/
	
	return draggable;
}

Viditbit.prototype.getResizable = function()
{
	var resizable = new Object();

	resizable.handles = "e, w";
	resizable.grid = [PIXELS_PER_TICK, 0];
	resizable.minWidth = PIXELS_PER_TICK - 2;
	resizable.maxWidth = Math.ceil(this.getOriginalLength() / SECONDS_PER_TICK) * PIXELS_PER_TICK;
	
	resizable.drag = function(event, element)
	{
		var trim = Math.floor((element.originalSize.width - element.size.width) / PIXELS_PER_TICK) * SECONDS_PER_TICK;
		var tick = pixel2tick(element.position.left);
		
		if(element.originalPosition.left == element.position.left)
		{
			$(this).data("viditbit").trim.right += trim;
			
			if($(this).data("viditbit").trim.right < 0)
			{
				$(this).data("viditbit").trim.left += $(this).data("viditbit").trim.right;
				$(this).data("viditbit").trim.right = 0;
			}
		}
		else
		{
			$(this).data("viditbit").position.tick = tick;
			$(this).data("viditbit").trim.left += trim;
			
			if($(this).data("viditbit").trim.left < 0)
			{
				$(this).data("viditbit").trim.right += $(this).data("viditbit").trim.left;
				$(this).data("viditbit").trim.left = 0;
			}
		}
	}
	
	return resizable;
}

function pixel2tick(pixel)
{
	return Math.floor(pixel / PIXELS_PER_TICK);
}

function pixel2sec(pixel)
{
	return pixel2tick(pixel) * SECONDS_PER_TICK;
}

Viditbit.prototype.getStartTime = function()
{
	return this.getLeftTrim();
}

Viditbit.prototype.getEndTime = function()
{
	return this.assetfile.getLength() - this.getRightTrim();
}

Viditbit.prototype.setAsVideo = function()
{
	var filename = this.assetfile.getFilename();
	var times = "#t=" + this.getStartTime() + "," + this.getEndTime();
	
	$("source#mp4").attr("src", filename + ".mp4" + times);
	$("source#webm").attr("src", filename + ".webm" + times);
	$("source#ogv").attr("src", filename + ".ogv" + times);
}

Viditbit.prototype.hasNextViditbit = function()
{
	return this.nextViditbit != Timeline.lastViditbit;
}

Viditbit.prototype.getNextViditbit = function()
{
	return this.nextViditbit;
}

Viditbit.prototype.hasPreviousViditbit = function()
{
	return this.previousViditbit != Timeline.firstViditbit;
}

Viditbit.prototype.getPreviousViditbit = function()
{
	return this.previousViditbit;
}

Viditbit.prototype.swapWithNextViditbit = function()
{
	var that = this.nextViditbit;
	
	this.nextViditbit = that.nextViditbit;
	that.nextViditbit = this;
	
	that.previousViditbit = this.previousViditbit;
	this.previousViditbit = that;
	
	this.nextViditbit.previousViditbit = this;
	this.previousViditbit.nextViditbit = this;
	that.nextViditbit.previousViditbit = that;
	that.previousViditbit.nextViditbit = that;
}

Viditbit.prototype.swapWithPreviousViditbit = function()
{
	var that = this.previousViditbit;
	
	this.previousViditbit = that.previousViditbit;
	that.previousViditbit = this;
	
	that.nextViditbit = this.nextViditbit;
	this.nextViditbit = that;
	
	this.nextViditbit.previousViditbit = this;
	this.previousViditbit.nextViditbit = this;
	that.nextViditbit.previousViditbit = that;
	that.previousViditbit.nextViditbit = that;
}