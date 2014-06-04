Instances = new Meteor.Collection("instances");

var loop = new function()
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

if(Meteor.isClient)
{
	Session.setDefault("cursor", {position: 0, playing: false});
	
	Template.timeline.cursor = function()
	{
		return Session.get("cursor");
	}
	
	Template.timeline.helpers(
	{
		left: function()
		{
			return this.position * 10 + "px";
		}
	});
	
	var clock = 0;
	loop.func = function()
	{
		var cursor = Session.get("cursor");
		if(cursor.playing)
		{
			clock += loop.framerate.getCurrent();
			if(clock > 1000)
			{
				cursor.position++;
				Session.set("cursor", cursor);
				
				clock -= 1000;
			}
		}
	};
	loop.reloop();
	
	Template.track.instances = Instances.find();
	
	Template.track.events =
	{
		"click .instance": function(event)
		{
			Videieio.pause();
			event.stopPropagation();
			//Session.set("currentlyPlayingVideo", this);
			Session.set("currentlySelectedVideo", this._id);
		}
	}
	
	Template.timeline.events =
	{
		"click": function()
		{
			Session.set("currentlySelectedVideo", undefined);
		}
	}
	
	Template.track.helpers(
	{
		width: function()
		{
			return this.length * 10 + "px";
		},
		left: function()
		{
			return this.position * 10 + "px";
		},
		backgroundImage: function()
		{
			return "url(videos/" + this.handle + ".jpg)";
		}
	});
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Instances.remove({});
	});
}