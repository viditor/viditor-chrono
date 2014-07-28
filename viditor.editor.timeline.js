Clips = new Meteor.Collection("clips");
Cursors = new Meteor.Collection("cursors");

PIXELS_PER_TICK = 10;
SECONDS_PER_TICK = 1;
SIZE_OF_TICKMARK = 3;

pixel2tick = function(pixel) {return Math.floor(pixel / PIXELS_PER_TICK);}
pixel2sec = function(pixel) {return pixel2tick(pixel) * SECONDS_PER_TICK;}

if(Meteor.isClient)
{
	Template.track.clips = function()
	{
		return Clips.find({track: this.toString()});
	}
}