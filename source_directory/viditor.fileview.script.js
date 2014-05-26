var Asset = function(data)
{
	this.name = data.name;
	this.thumbnail = data.thumbnail;
	this.type = data.type;
	
	this.element = $(this.template(data));
	
	for(var event in this.handlers)
	{
		this.element.on(event, this.handlers[event]);
	}
	
	$("#fileview").append(this.element);
}

Asset.prototype.source = '<div class="asset"><div class="{{type}} type"></div><div class="thumbnail" style="background-image: {{thumbnail}}"></div><div class="name">{{name}}</div></div>';
Asset.prototype.template = Handlebars.compile(Asset.prototype.source);

Asset.prototype.handlers = new Object();
Asset.prototype.handlers.mouseover = function()
{
	$("#playback").find("#details").css("display", "block");
}
Asset.prototype.handlers.mouseleave = function()
{
	$("#playback").find("#details").css("display", "none");
}
Asset.prototype.handlers.click = function()
{
	console.log(this.name);
};



var assets =
[
	{
		name: "SnowyFlag",
		thumbnail: "url(videos/snowing.jpg)",
		type: "video"
	},
	{
		name: "ChildrenLaughing",
		thumbnail: "url(videos/children.jpg)",
		type: "audio"
	},
	{
		name: "InTheCarOnTheRoad",
		thumbnail: "url(videos/inthecar.jpg)",
		type: "video"
	}
];


$(document).ready(function()
{
	for(var i in assets)
	{
		new Asset(assets[i]);
	}
});