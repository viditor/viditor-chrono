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
	
	css.backgroundColor = this.asset.color;
	
	css.left = this.getTickPosition() * PIXELS_PER_TICK;
	css.width = this.getTrimmedLength() * PIXELS_PER_TICK;
	
	return css;
}

Vidit.prototype.getDOM = function()
{
	return this.dom;
}