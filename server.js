"use strict";

var http = require("http");
var request = require("request");
var url = require("url"),
  server = new http.Server(),
  apiKey = require("./_settings.js").apiKey; //  Write your API key in "_settings.js".

server.listen(1337, "127.0.0.1");

server.on("request", function(reqServer, resServer) {
	city = url.parse(reqServer.url, true).query.city;

	request("http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + apiKey, function(err, res, body) {
		if(!err && res.statusCode == 200) {
			var bodyParsed = JSON.parse(body);

			if(bodyParsed.cod == 200) {
				var temp = Math.round(bodyParsed.main.temp - 270);

				resServer.end(city + ": " + temp);
			} else {
				resServer.end("City is not found");
			}
		} else {
			resServer.end("Error");
		}
	});
});