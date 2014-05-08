var Timeline = new function()
{
	this.firstViditbit = new Object();
	this.lastViditbit = new Object();
	
	this.getFirstViditbit = function()
	{
		return this.currentViditbit = this.firstViditbit.nextViditbit;
	}
	
	this.getCurrentViditbit = function()
	{
		return this.currentViditbit;
	}
	
	this.hasNextViditbit = function()
	{
		return this.currentViditbit.hasNextViditbit();
	}
	
	this.getNextViditbit = function()
	{
		var nextViditbit = this.currentViditbit.nextViditbit;
		return this.currentViditbit = nextViditbit;
	}
}