loop = new function()
{
	this.framerate = new function()
	{
		//delta is the time between frames, sigma
		//is the sum of all deltas, and the theta
		//is the count of all deltas.
		
		this.delta = Date.now();
		this.sigma = Date.now();
		this.theta = 0;
		
		this.preupdate = function()
		{
			this.delta = Date.now() - this.delta;
			this.sigma += this.delta;
			this.theta++;
		}
		
		this.postupdate = function()
		{
			this.delta = Date.now();
		}
		
		this.getCurrent = function()
		{
			var current = this.delta;
			return current//.toFixed(2);
		}
		
		this.getAverage = function()
		{
			var average = this.sigma / this.theta;
			return average.toFixed(2);
		}
	}
	
	this.loop = function()
	{
		this.framerate.preupdate();
		if(this.func) {this.func();}
		this.framerate.postupdate();
		
		this.reloop();
	}
	
	this.reloop = function()
	{
		window.requestAnimationFrame(this.loop.bind(this));
	}
}