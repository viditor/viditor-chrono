Instances = new Meteor.Collection("instances");
Cursors = new Meteor.Collection("cursors");

if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		Session.set("cursor_instance");
		var _id = Cursors.insert({position: 0, active: false, handle: "children"});
		Session.set("cursor", _id);
	});
	
	UI.registerHelper("css_width", function()
	{
		var length = this.length - this.left_trim - this.right_trim;
		//console.log(this.length, this.left_trim, this.right_trim);
		var width = length * 10 + 3 + "px";
		return "width: " + width + ";";
	});

	UI.registerHelper("css_background_image", function()
	{
		var background_image = "url(videos/" + this.handle + ".jpg)";
		return "background-image: " + background_image + ";";
	});
	
	UI.registerHelper("css_left", function()
	{
		var left = this.position * 10 + "px";
		return "left: " + left + ";";
	});
	
	Template.timeline.cursor = function()
	{
		var cursor_id = Session.get("cursor");
		return Cursors.findOne(cursor_id);
	}
	
	Template.track.instances = function()
	{
		var track_id = parseInt(this);
		return Instances.find({track: track_id});
	}
	
	Template.instance.rendered = function()
	{
		var data = this.data;
		var dom = this.find(".instance");

		$(dom).draggable({drag: function(event, element)
		{
			var position = element.position.left / 10;
			Instances.update(data._id, {$set: {position: position}});
		},
		grid: [10, 55], grid: [10, 0]});

		$(dom).resizable(getResizable(data));
	}

	Template.timeline.events =
	{
		"click": function(event)
		{
			var cursor_id = Session.get("cursor");
			var position = pixel2tick(event.clientX);
			Cursors.update(cursor_id, {$set: {position: position}});
		}
	}
}

if(Meteor.isServer)
{
	Meteor.startup(function()
	{
		Instances.remove({});
		Cursors.remove({});
	});
}



PIXELS_PER_TICK = 10;
SECONDS_PER_TICK = 1;
pixel2tick = function(pixel) {return Math.floor(pixel / PIXELS_PER_TICK);}
pixel2sec = function(pixel) {return pixel2tick(pixel) * SECONDS_PER_TICK;}

function getResizable(data)
{
	var resizable = new Object();
	
	resizable.handles = "e, w";
	resizable.minWidth = PIXELS_PER_TICK;
	resizable.grid = [PIXELS_PER_TICK, 0];
	resizable.maxWidth = (data.length + 1) * PIXELS_PER_TICK;

	resizable.stop = function(event, element)
	{
		var trim = pixel2sec((element.originalSize.width - element.size.width));
		var position = pixel2tick(element.position.left);

		var instance = Instances.findOne(data._id);
		var right_trim = instance.right_trim;
		var left_trim = instance.left_trim;
		if(instance.position == position)
		{
			right_trim += trim;

			if(right_trim < 0)
			{
				left_trim += right_trim;
				right_trim = 0;
			}
		}
		else
		{
			left_trim += trim;

			if(left_trim < 0)
			{
				right_trim += left_trim;
				left_trim = 0;
			}
		}

		Instances.update(data._id, {$set: {right_trim: right_trim, left_trim: left_trim, position: position}})
	}

	return resizable;
}

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