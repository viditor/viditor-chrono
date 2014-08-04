if(Meteor.isClient)
{
	Template.track.clips = function()
	{
		var track_id = this.toString();
		return Clips.find({track: track_id});
	}
}