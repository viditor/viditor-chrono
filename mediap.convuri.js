//node uri.js > uri.json

var fs = require("fs");

var index = 1;
var done = false;
var input = process.argv[2];

var parser = setInterval(function()
{
	var path = "uploaded_files/" + input + "-" + pad(index, 3, "0") + ".jpg";
	fs.readFile(path, function(error, data)
	{
		if(error) {clearInterval(parser); return;}
		console.log("data:image/jpeg;base64," + data.toString("base64"));
	});
	index++;
}, 10);

function pad(n, width, z) {z = z || "0"; n = n + ""; return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;}