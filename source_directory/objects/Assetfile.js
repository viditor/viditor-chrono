var Assetfile = function(filename, length)
{
	this.filename = filename;
	this.length = length;
	
	this.dom = $("<div></div>");
	this.dom.data("assetfile", this);
	this.dom.attr("class", "assetfile");
	this.dom.css(this.getDefaultCSS());
	this.dom.draggable(this.getDraggable());
	this.dom.appendTo("#filebrowser");
}

Assetfile.prototype.getFilename = function()
{
	return this.filename;
}

Assetfile.prototype.getImageURL = function()
{
	return "url(" + this.getFilename() + ".jpg)";
}

Assetfile.prototype.getLength = function()
{
	return this.length;
}

Assetfile.prototype.getDefaultCSS = function()
{
	var css = new Object();
	
	css.backgroundImage = this.getImageURL();
	
	return css;
}

Assetfile.prototype.getDraggable = function()
{
	var draggable = new Object();
	
	draggable.containment = "body";
	draggable.revert = true;
	
	return draggable;
}

Assetfile.prototype.viditize = function(tick, track)
{
	return new Viditbit(this, tick, track);
}