module.exports = function(user_board){

	
	var combinaciones = [
		[0,1,2],
		[3,4,5],
		[6,7,8],
		[0,3,6],
		[1,4,7],
		[2,5,8],
		[0,4,8],
		[2,4,6]

	];

	for(var j = 0; j<combinaciones.length;j++){
		var combinacion = combinaciones[j];
		var gano = true;
		for(var i = 0; i<combinacion.length; i++){
			if(!isInArray(user_board,combinacion[i])){
				gano=false;
				break;
			}
		}
		if(gano){return true};
		
	}


return false;
	//return gano;
	

}

function isInArray(arreglo, elemento){
	return arreglo.indexOf(elemento) > -1;
}