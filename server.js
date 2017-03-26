var express = require("express");
var http = require("http");
var app = require("./socket_express");
var port = process.env.PORT || 3000;


app.use("/static",express.static("public"));

app.get("/", function(req, res){
	res.sendFile("index.html",{"root":__dirname});
});


var server = http.createServer(app);

app.io.attach(server);

server.listen(port, function () {
  console.log('Aplicacion escuchando en el puerto: ' + port)
});
