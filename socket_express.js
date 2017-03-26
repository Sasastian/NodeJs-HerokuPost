var express = require("express");
var socket_io = require("socket.io");
var evaluator = require("./evaluator");

var app = express();
var io = socket_io();

var posiciones_ocupadas={};
var turno = true;

var figure = true;

app.io = io;

io.on("connection", function(socket){ //cliente que se conecta
	//console.log(evaluator([2,0,1]));
	console.log("se conectaron");

	socket.on("chat message",function(msg){
		console.log("chat message: ",msg);
		io.emit("chat message",msg);
	});

	socket.on("disconnect",function(){
		console.log("user disconnect");
	});

	posiciones_ocupadas={};
	socket.broadcast.emit("reset",{});//a todos menos a mi

	socket.emit("init", {figure:figure});

	socket.figure = figure;
	socket.user_board = [];

	figure = !figure;
	//console.log(figure+" figure");

	socket.on("nuevo_movimiento", function(data){
		if (!posiciones_ocupadas[data.posicion]) {	

			if (turno == socket.figure) {

			

			socket.user_board.push(parseInt(data.posicion));	

			posiciones_ocupadas[data.posicion]=true;			
			io.emit("alguien_tiro",{posicion:data.posicion, figura:socket.figure});
		//console.log(data);
			var evaluacion_del_tablero = evaluator(socket.user_board);
			console.log("resultado "+evaluacion_del_tablero+" tablero: "+socket.user_board)
			if (evaluacion_del_tablero) {
				console.log("alguien gano");
				io.emit("won",{figure: socket.figure})
			}
			turno = !turno;
		}else{
			socket.emit("no_te_toca",{});
		}
		}else{
			console.log("alguien tiro en una posicion ocupada");
		}
	});
});

module.exports = app;


