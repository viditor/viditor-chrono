var socket = io.connect("http://127.0.0.1");

var PIXELS_PER_TIMEBIT = 20;

socket.on("accessiblize asset", function(data)
{
	accessiblizeAsset(data);
});

socket.on("instantiate asset", function(data)
{
	instantiateAsset(data);
});

socket.on("update asset", function(data)
{
	updateAsset(data);
});

socket.on("stream asset", function(data)
{
	console.log("!");
	var screen = document.getElementById("stream");
	screen.src = "data:image/jpeg;base64," + data;
});

$(function()
{
	$(".timeline").droppable(
	{
		accept: ".explorer > .asset",
		drop: function(event, element)
		{
			data = new Object();
			data.instantiationidnum = new Date().getTime();
			data.uploadedidnum = parseInt($(element.draggable).attr("id"));
			data.horizposition = Math.floor((element.position.left / PIXELS_PER_TIMEBIT) + 0.5);
			
			socket.emit("instantiate asset", data);
		}
	});
});

function instantiateAsset(data)
{
	$asset = $("<div></div>");
	$asset.attr("class", "asset");
	$asset.attr("id", data.instantiationidnum);
	$asset.css("left", data.horizposition * PIXELS_PER_TIMEBIT);
	$asset.css("position", "absolute");
	$asset.css("background-image", "URL(user_assets/" + data.uploadedidnum + "-001.jpg)");

	$asset.draggable(
	{
		stack: ".asset",
		grid: [PIXELS_PER_TIMEBIT, 0],
		stop: function(event, element)
		{
			data = new Object();
			data.instantiationidnum = parseInt($(this).attr("id"));
			data.horizposition = $(this).position().left / PIXELS_PER_TIMEBIT;
			
			socket.emit("update asset", data);
		}
	});

	$(".timeline").append($asset);
}

function updateAsset(data)
{
	$asset = $("#" + data.instantiationidnum);
	
	if(data.horizposition !== null) {$asset.css("left", data.horizposition * PIXELS_PER_TIMEBIT);}
}

function accessiblizeAsset(data)
{
	$asset = $("<div></div>");
	$asset.attr("class", "asset");
	$asset.attr("id", data.uploadedidnum);
	$asset.css("background-image", "URL(user_assets/" + data.uploadedidnum + "-001.jpg)");
	$asset.draggable(
	{
		scroll: false,
		stack: ".asset",
		helper: "clone",
		revert: "invalid"
	});
	
	$asset.appendTo(".explorer");
}