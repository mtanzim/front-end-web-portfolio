


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}




//main function
$(document).ready(function(){

	//alert ("Hi, I'm the calculator!")
	var calcOrder=['AC','CE','/', 'x',7,8,9,'-',4,5,6,'+',1,2,3,0,'.','=' ];
	var bootstrapColWidth="col-md-3"
	for (var i in calcOrder){
		if (calcOrder[i]==='='){
			bootstrapColWidth="col-md-9"
		} else {bootstrapColWidth="col-md-3";}
		$('#calcButtons').append('<div class="'+bootstrapColWidth+'"" text-center"><button type="button" id="btn_'+calcOrder+'"class="btn btn-primary btn-lg">'+calcOrder[i]+'</button></div>');
		if (['x', '-', '+',0].includes(calcOrder[i])){
			$('#calcButtons').append('<div class="col-md-12"><br></div>')
		}

	}
		

});