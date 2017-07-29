


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}


function prepareButtons () {
	var calcOrder=['AC','CE','/', '*',7,8,9,'-',4,5,6,'+',1,2,3,'.',0,'=' ];
	var bootstrapColWidth="col-md-3"
	var buttonList=[];
	for (var i in calcOrder){
		var curButton='btn_'+calcOrder[i];
		if (calcOrder[i]==='='){
			bootstrapColWidth="col-md-9"
		} else {bootstrapColWidth="col-md-3";}
		$('#calcButtons').append('<div class="'+bootstrapColWidth+'"" text-center"><button type="button" id="'+curButton+'"class="calcBtns btn btn-primary btn-lg ">'+calcOrder[i]+'</button></div>');
		if (['*', '-', '+','.'].includes(calcOrder[i])){
			$('#calcButtons').append('<div class="col-md-12"><br></div>')
		}
		buttonList.push(curButton);
	}
	return buttonList;

}

function useButton (btnID, equationFunc){
	//alert (btnID);
	var numButtons=['0','1','2','3','4','5','6','7','8','9','.'];
	var opButtons=['/', 'x','-','+'];
	var ctrlButtons=['AC','CE','='];
	var equationToken=btnID.split('_');
	var lastChar=equationFunc[equationFunc.length-1]
	equationToken=equationToken[equationToken.length-1];


	if (numButtons.includes(equationToken)){
		equationFunc+=equationToken;
	}
	else if (opButtons.includes(equationToken)){
		if (lastChar!==equationToken){
			equationFunc+=equationToken;
		}
	}
	else if (equationToken==='AC'){
		equationFunc='';
	}
	
	console.log(equationFunc);
	return equationFunc;

}



//main function
$(document).ready(function(){

	//alert ("Hi, I'm the calculator!")
	var buttons=prepareButtons();
	var equation='';
	console.log(buttons);	
		
	$(".calcBtns").on("click", function(){
		equation=useButton(this.id,equation);
		console.log(equation);
	});
});