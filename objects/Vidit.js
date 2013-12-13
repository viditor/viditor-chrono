var Vidit = function(asset, tick, track)
{
	this.asset = asset;
	this.trim = {left: 0, right: 0};
	this.position = {tick: 0, track: 0};
	
	if(tick) {this.position.tick = tick;}
	if(track) {this.position.track = track;}
	
	this.dom = $("<div></div>");
	this.dom.data("vidit", this);
	this.dom.attr("class", "vidit");
	this.dom.css(this.getDefaultCSS());
	this.dom.draggable(this.getDraggable());
	this.dom.resizable(this.getResizable());
}

var PIXELS_PER_TICK = 10;
var SECONDS_PER_TICK = 1;

Vidit.prototype.getOriginalLength = function()
{
	return this.asset.length;
}

Vidit.prototype.getTrimmedLength = function()
{
	return this.asset.length - this.trim.right - this.trim.left;
}

Vidit.prototype.getTickPosition = function()
{
	return this.position.tick;
}

Vidit.prototype.getTrackPosition = function()
{
	return this.position.track;
}

Vidit.prototype.getDefaultCSS = function()
{
	var css = new Object();
	
	css.position = "absolute";
	css.backgroundColor = this.asset.color;
	
	css.left = this.getTickPosition() * PIXELS_PER_TICK;
	css.width = this.getTrimmedLength() * PIXELS_PER_TICK;
	
	return css;
}

Vidit.prototype.getDOM = function()
{
	return this.dom;
}

Vidit.prototype.getDraggable = function()
{
	var draggable = new Object();
	
	draggable.scroll = true;
	draggable.scrollSpeed = 10;
	draggable.scrollSensitivity = 40;
	draggable.containment = "#timeline";
	draggable.grid = [PIXELS_PER_TICK, 0];
	
	draggable.drag = function(event, element)
	{
		$(this).data("vidit").position.tick = pixel2tick(element.position.left);
	}
	
	return draggable;
}

Vidit.prototype.getResizable = function()
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
			$(this).data("vidit").trim.right += trim;
			
			if($(this).data("vidit").trim.right < 0)
			{
				$(this).data("vidit").trim.left += $(this).data("vidit").trim.right;
				$(this).data("vidit").trim.right = 0;
			}
		}
		else
		{
			$(this).data("vidit").position.tick = tick;
			$(this).data("vidit").trim.left += trim;
			
			if($(this).data("vidit").trim.left < 0)
			{
				$(this).data("vidit").trim.right += $(this).data("vidit").trim.left;
				$(this).data("vidit").trim.left = 0;
			}
		}
	}
	
	return resizable;
}

function pixel2tick(pixel)
{
	return Math.floor(pixel / PIXELS_PER_TICK);
}