function Socket(gano,nueva_jugada, reiniciar, no_te_toca, conexion){

	var juego = false;

	var socket = io();

	var self = this;


	self.play=function(posicion){
		socket.emit("nuevo_movimiento", {posicion:posicion});
		//movimiento(self.figura(),posicion);
	}

	self.figura=function(bandera){
		if(self.juego){
			return "X";
		}
		return "O";
	}

	socket.on("connect", function(){

		socket.on("init", function(data){

			console.log(data);
			self.juego=data.figure;
			conexion(self.figura());
		});

		socket.on("reset", function(){
			reiniciar();
		});

		socket.on("won", function(data){
			var figura = data.figure;
			gano(figura);
		});
		socket.on("no_te_toca", function(data){
			no_te_toca();
		});

		socket.on("alguien_tiro",function(data){
			nueva_jugada(data.posicion, data.figura);
		});

	});

}