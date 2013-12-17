var Timeline = new function()
{
	this.firstVidit = new Object();
	this.lastVidit = new Object();
	
	this.getFirstVidit = function()
	{
		return this.currentVidit = this.firstVidit.nextVidit;
	}
	
	this.getCurrentVidit = function()
	{
		return this.currentVidit;
	}
	
	this.hasNextVidit = function()
	{
		return this.currentVidit.hasNextVidit();
	}
	
	this.getNextVidit = function()
	{
		var nextVidit = this.currentVidit.nextVidit;
		return this.currentVidit = nextVidit;
	}
}