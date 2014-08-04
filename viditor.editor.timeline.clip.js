if(Meteor.isClient)
{
	Template.clip.rendered = function()
	{
		var data = this.data;
		var clip = this.find(".clip");

		$(clip).draggable({
		
			drag: function(event, element)
			{
				Session.set("selected", data._id);
				var position = Math.floor(element.position.left / PIXELS_PER_TICK);
				Clips.update(data._id, {$set: {position: position}});
			},
			grid: [PIXELS_PER_TICK, 55]
			
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
		var width = length * PIXELS_PER_TICK + SIZE_OF_TICKMARK + "px";
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
}