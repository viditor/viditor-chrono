Clips = new Meteor.Collection("clips");
Cursors = new Meteor.Collection("cursors");

PIXELS_PER_TICK = 10;
SECONDS_PER_TICK = 1;
SIZE_OF_TICKMARK = 3;

pixel2tick = function(pixel) {return Math.floor(pixel / PIXELS_PER_TICK);}
pixel2sec = function(pixel) {return pixel2tick(pixel) * SECONDS_PER_TICK;}

if(Meteor.isClient)
{
	//Clips.insert({track: "alpha", color: "red", position: 5, length: 10, right_trim: 0, left_trim: 0});
	
	Template.track.clips = function()
	{
		return Clips.find({track: this.toString()});
	}
}

/*if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		var _id = Cursors.insert({position: 0, playing: false, muted: true, instance_id: undefined});
		Session.set("cursor", _id);
	});
	
	UI.registerHelper("css_width", function()
	{
		var length = this.length - this.left_trim - this.right_trim;
		var width = length * PIXELS_PER_TICK + SIZE_OF_TICKMARK + "px";
		return "width: " + width + ";";
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
		//Insts.remove({});
		//Cursors.remove({});
	});
}*/