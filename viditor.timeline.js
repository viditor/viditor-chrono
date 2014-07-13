Instances = new Meteor.Collection("instances");
Cursors = new Meteor.Collection("cursors");

if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		var _id = Cursors.insert({position: 0, playing: false, muted: true, instance_id: undefined});
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
			Cursors.update(cursor_id, {$set: {position: position, playing: false}});
		}
	}

	Template.instance.events =
	{
		"click": function(event)
		{
			event.stopPropagation(); // Don’t bubble up to the timeline, sonny!
			var tooltip = $(event.target).find(".tooltip");
			var otherTooltips = $(event.target).parent().find(".instance").not(event.target).find(".tooltip");
			tooltip.toggleClass("visible");
			otherTooltips.removeClass("visible");
		}
	}

	var loop = function(func)
	{
		this.delta = Date.now();

		this._preupdate = function()
		{
			this.delta = Date.now() - this.delta;
		}

		this._postupdate = function()
		{
			this.delta = Date.now();
		}

		this._loop = function()
		{
			this._preupdate();
			if(this.func) {this.func();}
			this._postupdate();
			this._reloop();
		}

		this._reloop = function()
		{
			window.requestAnimationFrame(this._loop.bind(this));
		}

		this.func = func;
		this._reloop();
	}

	loop(function()
	{
		var cursor_id = Session.get("cursor");
		var cursor = Cursors.findOne(cursor_id);

		if(cursor && cursor.playing)
		{
			var position = cursor.position + (this.delta / 1000);

			var instance_id = -1;
			var instances = Instances.find({position: {$lte: position}});
			instances.forEach(function(instance, index)
			{
				if(position < instance.position + instance.length)
				{
					instance_id = instance._id;
				}

				//THIS ALGORITH IS SO STUPID IT HURTS.

				//BUT AT LEAST IT WORKS, RIGHT?
			});

			Cursors.update(cursor_id, {$set: {position: position, instance_id: instance_id}});
		}
	})
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
