Clips = new Meteor.Collection("clips");
Cursors = new Meteor.Collection("cursors");

PIXELS_PER_TICK = 10;
SECONDS_PER_TICK = 1;
SIZE_OF_TICKMARK = 3;

pixel2tick = function(pixel) {return Math.round(pixel / PIXELS_PER_TICK);}
pixel2sec = function(pixel) {return pixel2tick(pixel) * SECONDS_PER_TICK;}
sec2tick = function(sec) {return sec * SECONDS_PER_TICK;}
sec2pixel = function(sec) {return sec2tick(sec) * PIXELS_PER_TICK;}