(function(){
	

function $(selector){
	return document.querySelector(selector);
}

function jugar(seleccionado){
	//seleccionado.innerHTML="x";

	if(true){
		seleccionado.innerHTML="x";

	}else{
		seleccionado.innerHTML="o";
	}
}

function definir_eventos(){
	var elements=document.querySelectorAll(".cat-element");

	for (var i = 0; i < elements.length; i++) {
		var element = elements[i];

		element.addEventListener("click",function(){
			//console.log(this.id);
			var posicion = this.id.split("-")[1];

			socket.play(posicion);
			//jugar(this);
		});
	}
}

function build_cat(){
	for (var i = 0; i < 9; i++) {
		var item=build_item(i);

		$("#cat").innerHTML += item;

	}
	definir_eventos();
}

function build_item(i){
	return "<div class='cat-element col-xs-4' id='elemento-"+i+"'></div>"
}

function convertir_a_figura(bandera){
	if (bandera) {
		return "X";
	}
	return "O";
}



function reset(){
	var elements=document.querySelectorAll(".cat-element");

	for (var i = 0; i < elements.length; i++) {
		elements[i].innerHTML="";
	}
}
build_cat();


var socket = new Socket(function(figura){
	var figura_string = convertir_a_figura(figura);
	swal(figura_string+" Ganó la partida");

},function(posicion,figura){
	$("#message").innerHTML="ES EL TURNO DE LAS "+convertir_a_figura(!figura);
	
	$('#elemento-'+posicion).innerHTML = convertir_a_figura(figura);


},function(){
	swal("Algien ingreso", "reiniciaremos el tablero");

	reset();
},function(){
	swal("No es tu turno", "Espera para que el otro jugador tire");
},function(figura){
	

	$("#message").innerHTML="Juegas con las "+figura;
	if (figura=="X") {
		$("#message").innerHTML+="<br>ES TU TURNO";
	}else{
		$("#message").innerHTML+="<br>NO ES TU TURNO";

	}
});


})();

