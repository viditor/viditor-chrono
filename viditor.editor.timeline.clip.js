if(Meteor.isClient)
{
	Template.clip.rendered = function()
	{
		var data = this.data;
		var dom = this.find(".clip");

		$(dom).draggable({
			drag: function(event, element)
			{
				Session.set("selected", data._id);
				var position = pixel2tick(element.position.left);
				Clips.update(data._id, {$set: {position: position}});
			},
			grid: [PIXELS_PER_TICK, 55]
		})
		.resizable({
			handles: "e, w",
			grid: [PIXELS_PER_TICK, 0],
			minWidth: PIXELS_PER_TICK,
			maxWidth: (data.length) * PIXELS_PER_TICK,
			stop: function(event, element)
			{
				var trim = pixel2sec((element.originalSize.width - element.size.width));
				var position = pixel2tick(element.position.left);

				var clip = Clips.findOne(data._id);
				var right_trim = clip.right_trim;
				var left_trim = clip.left_trim;
				if(clip.position == position)
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

				Clips.update(data._id, {$set: {right_trim: right_trim, left_trim: left_trim, position: position}})
			}
		});
	}
	
	Template.clip.image = function()
	{
		/*var background_image = "url(" + this.source + this.handle + ".jpg)";
		return "background-image: " + background_image + ";";*/
		
		var background_color = this.color;
		return "background-color: " + background_color + ";";
	}
	
	Template.clip.position = function()
	{
		var left = this.position * PIXELS_PER_TICK + "px";
		return "left: " + left + ";";
	}
	
	Template.clip.length = function()
	{
		var length = this.length - this.left_trim - this.right_trim;
		var width = length * PIXELS_PER_TICK + "px";
		return "width: " + width + ";";
	}
	
	Template.clip.outline = function()
	{
		if(Session.equals("selected", this._id))
		{
			return "outline: 1px solid yellow;";
		}
	}
	
	Template.clip.events =
	{
		"click": function(event)
		{
			event.stopPropagation();
			Session.set("selected", this._id);
		}
	}
	
	Meteor.startup(function()
	{
		$(document).keydown(function(event)
		{
			if(event.keyCode == 46)
			{
				var clip_id = Session.get("selected");
				Clips.remove(clip_id);
				Session.set("selected", undefined);
			}
		});
	});
}