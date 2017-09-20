


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
	var bootstrapColWidth="noPadding col-md-3 col-sm-3 col-xs-3"
	var calcButtonClasses="noPadding calcBtns"
	var buttonList=[];
	for (var i in calcOrder){
		var curButton='btn_'+calcOrder[i];
		if (calcOrder[i]==='='){
			bootstrapColWidth="col-md-9 col-sm-9 col-xs-9 noPadding"
		} else {bootstrapColWidth="col-md-3 col-sm-3 col-xs-3 noPadding";}
		$('#calcButtons').append('<div class="'+bootstrapColWidth+'"" text-center"><button type="button" id="'+curButton+'"class="'+calcButtonClasses+'">'+calcOrder[i]+'</button></div>');
		if (['*', '-', '+','.'].includes(calcOrder[i])){
			//$('#calcButtons').append('<div class="col-md-12"><br></div>')
		}
		buttonList.push(curButton);
	}
	return buttonList;

}


function splitEquation (equationToSplit){

	//splits up by operators, but remembers operators
	var equationParts=equationToSplit.split(/(\+|-|\*|\/)/g);
	
	console.log('provided:'+equationParts);
	//console.log(state);
	
	//handle negative number results; this works due to the way regEx is generating the array
	for (var j=0; j<equationParts.length-1;j++){
		if (equationParts[j]===''){
			equationParts.splice(j,3,equationParts[j+1]+equationParts[j+2]);
			console.log('found negative integer values');
			console.log('adjusted array: '+equationParts);
		}
	}

	return equationParts;

}

function resolveEqn(equationResolve, state){	


	/*
	//splits up by operators, but remembers operators
	var equationParts=equationResolve.split(/(\+|-|\*|\/)/g);
	
	console.log('provided:'+equationParts);
	//console.log(state);
	
	//handle negative number results; this works due to the way regEx is generating the array
	for (var j=0; j<equationParts.length-1;j++){
		if (equationParts[j]===''){
			equationParts.splice(j,3,equationParts[j+1]+equationParts[j+2]);
			console.log('found negative integer values');
			console.log('adjusted array: '+equationParts);
		}
	}
	*/

	var equationParts=splitEquation(equationResolve);

	if (state==='DM'){
		for (var i=0; i < equationParts.length; i++){
			if (equationParts[i]==='/'){
				//console.log('first:'+equationParts[i-1]);
				//console.log('operator:'+equationParts[i]);
				//console.log('second:'+equationParts[i+1]);
				var newMember=parseFloat(equationParts[i-1])/parseFloat(equationParts[i+1]);
				//insert resolved equation into the array
				equationParts.splice(i-1,3,newMember);
				break;
			}
			else if (equationParts[i]==='*'){
				//console.log('first:'+equationParts[i-1]);
				//console.log('operator:'+equationParts[i]);
				//console.log('second:'+equationParts[i+1]);
				var newMember=parseFloat(equationParts[i-1])*parseFloat(equationParts[i+1]);
				//insert resolved equation into the array
				equationParts.splice(i-1,3,newMember);
				break;
			}
		}	
	}
	else if (state==='AS'){
		for (var i=0; i < equationParts.length; i++){
			if (equationParts[i]==='+'){
				//console.log('first:'+equationParts[i-1]);
				//console.log('operator:'+equationParts[i]);
				//console.log('second:'+equationParts[i+1]);
				var newMember=parseFloat(equationParts[i-1])+parseFloat(equationParts[i+1]);
				//insert resolved equation into the array
				equationParts.splice(i-1,3,newMember);
				break;
			}
			else if (equationParts[i]==='-'){
				//console.log('first:'+equationParts[i-1]);
				//console.log('operator:'+equationParts[i]);
				//console.log('second:'+equationParts[i+1]);
				var subFrom = equationParts[i-1];
				//if (isNaN(subFrom)){subFrom=0.0;}
				var newMember=parseFloat(subFrom-parseFloat(equationParts[i+1]));
				//insert resolved equation into the array
				equationParts.splice(i-1,3,newMember);
				break;
			}
		}	
	}

	console.log('resolved:'+equationParts);	
	return equationParts.join('');
}

function useButton (btnID, equationFunc){
	//alert (btnID);
	var numButtons=['0','1','2','3','4','5','6','7','8','9'];
	var opButtons=['/', '*','+'];
	var divMulButtons=['/','*']; //not being used
	var addSubButtons=['+','-']; //not being used
	var ctrlButtons=['AC','CE','='];

	var equationToken=btnID.split('_');
	var lastChar=equationFunc[equationFunc.length-1];
	//use these for UI division
	var mainText='';
	var subText='';
	equationToken=equationToken[equationToken.length-1];

	//for main text, need to get all the characters before the last operation, and then add it
	//this is reduntant in 2 functions; merge usage
	var equationParts=splitEquation(equationFunc);

	/*
	var equationParts=equationFunc.split(/(\+|\-|\*|\/)/g);
	for (var j=0; j<equationParts.length-1;j++){
		if (equationParts[j]===''){
			equationParts.splice(j,3,equationParts[j+1]+equationParts[j+2]);
			console.log('found negative integer values in useButton');
			console.log('adjusted array: '+equationParts);
		}
	}
	*/
	//get the last part of the equation for additional manipulation
	mainText=equationParts[equationParts.length-1];
	mainText+=equationToken;
	//subText=equationParts.join('');


	if (numButtons.includes(equationToken)){
		equationFunc+=equationToken;
		
	}
	else if (opButtons.includes(equationToken)){
		mainText='';
		if (opButtons.includes(lastChar)===false && equationFunc!=='' && lastChar!=='-'){
			equationFunc+=equationToken;
			subText=equationFunc;
			$('#subText').val(subText);
		}
	}
	else if (equationToken==='AC'){
		//reset everything
		equationFunc='';
		mainText='';
		subText='';
		$('#subText').val(subText);
	}
	else if (equationToken==='CE'){
		//reset everything
		var reconst=splitEquation(equationFunc);
		reconst.pop();
		equationFunc=reconst.join('');
		mainText='';

	}
	//usage of decimal button
	else if (equationToken==='.'){
		if (lastChar!==equationToken && numButtons.includes(lastChar)){
			equationFunc+=equationToken;
		}
	}
	else if (equationToken==='-'){
		if (lastChar!==equationToken){
			equationFunc+=equationToken;
		} else {mainText='';}
		//treat as operation button
		if ($('#mainText').val()!==''){
			//console.log('mainText not empty')
			mainText='';
			subText=equationFunc;
			$('#subText').val(subText);
		}
	}
	else if (equationToken==='='){
		//resolve divisions and multiplications first
		subText=equationFunc;
		var i=0;
		while (equationFunc.indexOf('/') >=0 || equationFunc.indexOf('*') >=0 || i===10){
			equationFunc=resolveEqn(equationFunc,'DM');
			i++;
			console.log("after resolve="+equationFunc);
		}
		i=0;
		//while (equationFunc.indexOf('+') >=0 || equationFunc.indexOf('-') >=0 || isNaN(equationFunc) || i===10){
		while (isNaN(equationFunc) && i<10){
			equationFunc=resolveEqn(equationFunc,'AS');
			i++;
			console.log("after resolve="+equationFunc);
		}
		mainText=equationFunc;
		//subText='';
		$('#subText').val(subText);
		
	}
	
	console.log(equationFunc);
	//console.log('maintText: '+mainText);
	
	
	$('#mainText').val(mainText);
	
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
		//console.log(equation);
	});
});