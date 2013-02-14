var Asset = function(idnum, position, filename)
{
	this.idnum = idnum;
	this.position = position;
	this.filename = filename;
	
	this.element = document.createElement('asset');
	this.element.id = "@" + this.idnum;
	document.getElementById("&2").appendChild(this.element);
	
	this.updatePosition();
	this.setBackground();
};

Asset.prototype.getWidth = function()
{
	return this.element.offsetWidth;
}

Asset.prototype.getPosition = function()
{
	return this.element.offsetLeft;
}

Asset.prototype.updatePosition = function()
{
	this.element.style.left = this.position + "px";
}

Asset.prototype.setBackground = function()
{
	this.element.style.backgroundImage = "url('assets/" + this.filename + ".png')";
}