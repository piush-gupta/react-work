var express = require('express');
var bodyParser = require("body-parser");
var Router=require("../App/router")
var path= require("path");

var app = express();
	app.use(bodyParser.json())
	app.use(express.static(path.join(__dirname, "../App/build")));
	// app.use("/App",Router );

app.use('/', Router);
app.use('*', function (req, res) {
    res.sendFile(path.join(__dirname, "../App/build/index.html"));
});

app.listen(7777, function () {
	console.log('Example app listening on port 7777!');
});