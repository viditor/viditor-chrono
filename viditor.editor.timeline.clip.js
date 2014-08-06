if(Meteor.isClient)
{
	Session.setDefault("zoom", 1);
	Session.set("zoom", 1);
	
	Template.clip.rendered = function()
	{
		var data = this.data;
		var dom = this.find(".clip");
		
		$(dom).draggable({
			drag: function(event, element)
			{
				//add code to check if width has changed.
				
				//..this won't work across browsers, will it? :<
			},
			stop: function(event, element)
			{
				Session.set("selected clip_id", data._id);
				var zoom = Session.get("zoom");
				var position = pixel2tick(element.position.left) / zoom;
				Clips.update(data._id, {$set: {position: position}});
				timeline_width_dependency.changed();
			},
			grid: [PIXELS_PER_TICK, 55]
		})
		.resizable({
			handles: "e, w",
			grid: [PIXELS_PER_TICK, 0],
			minWidth: PIXELS_PER_TICK,
			maxWidth: (data.length) * PIXELS_PER_TICK * Session.get("zoom"),
			stop: function(event, element)
			{
				var zoom = Session.get("zoom");
				var widthdiff = element.originalSize.width - element.size.width;
				var trim = pixel2sec(widthdiff) / zoom;
				var position = pixel2tick(element.position.left) / zoom;

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
				
				//add code to check if width has changed.
				timeline_width_dependency.changed();
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
		var position = sec2pixel(this.position);
		var zoom = Session.get("zoom");
		var left = (position * zoom) + "px";
		return "left: " + left + ";";
	}
	
	Template.clip.length = function()
	{
		$("#" + this._id).resizable({maxWidth: this.length * PIXELS_PER_TICK * Session.get("zoom")});
		
		var length = sec2pixel(this.length - this.left_trim - this.right_trim);
		var zoom = Session.get("zoom");
		var width = (length * zoom) + "px";
		return "width: " + width + ";";
	}
	
	Template.clip.outline = function()
	{
		if(Session.equals("selected clip_id", this._id))
		{
			return "outline: 1px solid yellow;";
		}
	}
	
	Template.clip.events =
	{
		"click": function(event)
		{
			event.stopPropagation();
			Session.set("selected clip_id", this._id);
		}
	}
	
	Meteor.startup(function()
	{
		$(document).keydown(function(event)
		{
			if(event.keyCode == 46)
			{
				var clip_id = Session.get("selected clip_id");
				Clips.remove(clip_id);
				Session.set("selected clip_id", undefined);
			}
		});
	});
}