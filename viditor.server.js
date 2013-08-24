var express = require("express");
var fs = require("fs");

var app = express();

app.get("/", function(request, response)
{
	fs.readFile("viditor.index.html", function(error, data)
	{
		if(error)
		{
			response.writeHead(500, {"content-type": "text/plain"});
			return response.end(error.toString());
		}
		
		response.writeHead(200, {"content-type": "text/html"});
		response.end(data);
	});
});

app.use(express.static(__dirname + "/public_resources"));

app.listen(3000);

console.log("Server is running on 127.0.0.1:3000");