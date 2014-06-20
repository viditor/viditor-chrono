Instances = new Meteor.Collection("instances");
Cursors = new Meteor.Collection("cursors");

if(Meteor.isClient)
{
	Meteor.startup(function()
	{
		Session.set("cursor_instance");
		var _id = Cursors.insert({position: 0});
		Session.set("cursor", _id);
	});
	
	UI.registerHelper("css_width", function()
	{
		var width = this.length * 10 + "px";
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
		grid: [10, 0], grid: [10, 55]});

		$(dom).resizable(getResizable(data));
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
	console.log(data.length);
	resizable.handles = "e, w";
	resizable.grid = [PIXELS_PER_TICK, 0];
	resizable.minWidth = PIXELS_PER_TICK;
	resizable.maxWidth = data.length * PIXELS_PER_TICK;

	resizable.resize = function(event, element)
	{
		var trim = pixel2sec((element.originalSize.width - element.size.width));
		var tick = pixel2tick(element.position.left);
		console.log(trim, tick);
		//var length = (element.size.width - 6) / 10;
		//Instances.update(data._id, {$set: {length: length}});
	}

	return resizable;
}