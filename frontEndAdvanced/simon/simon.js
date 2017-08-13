


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}



function prepareSimonButtons () {
	//var simonButtons=['g','r','b','y'];
	//var bootstrapColWidth="col-md-3"
	var buttonList=[];
	console.log(Object.keys(globalSimonVars.simonButtons));

	//$('#simonButtons').append('<div class="col-md-3 btn-group">');
	//$('#simonButtons').append('<div class="row">');	
	for (var i in Object.keys(globalSimonVars.simonButtons)){
		//console.log(Object.keys(simonButtons)[i]);
		var curButton='btn_'+Object.keys(globalSimonVars.simonButtons)[i];
		//$('#simonButtons').append('<div class="'+bootstrapColWidth+'"><button type="button" id="'+curButton+'" class="btn btn-primary btn-lg">'+simonButtons[i]+'</button></div>');
		$('#simonButtons').append('<button type="button" id="'+curButton+'" class="btn btn-primary simonBigBtn"></button>');
		//$('#simonButtons').append('<div class="col-md-12"><br></div>');
		buttonList.push(curButton);
	}
	//$('#simonButtons').append('</div>');
	$('#simonButtons').append('</div>');
	//console.log(buttonList);
	return buttonList;

}


function togglePower (isOn, btnID, startID, strictID){
	//console.log(btnID	);

	if (isOn){
		isOn=false;
		globalSimonVars.isInputReq=false;
		$('#'+btnID).removeClass("btn-success");
		$('#'+btnID).addClass("btn-danger");
		$('#'+btnID).html("OFF");
		$('#'+startID).prop("disabled",true);
		$('#'+strictID).prop("disabled",true);
	}
	else {
		isOn=true;	
		$('#'+btnID).removeClass("btn-danger");
		$('#'+btnID).addClass("btn-success");
		$('#'+btnID).html("ON");
		$('#'+startID).prop("disabled",false);
		$('#'+strictID).prop("disabled",false);
	}
	return isOn;

}


function playAsound (sequence, intervalID,callback){
	globalSimonVars.isInputReq=false;
	$('.simonBigBtn').css("opacity",'1.0');
	console.log();
	if (sequence.length>0){
		var seqKeys = Object.keys(globalSimonVars.simonButtons);
		var btn_name=seqKeys[sequence[0]];

		console.log ('start '+sequence);
		console.log ('playing sound:'+btn_name);
		new Audio(globalSimonVars.simonButtons[btn_name]).play();
		$('#btn_'+btn_name).css("opacity",'0.5');


		sequence.shift();
		console.log ('end' + sequence);
	} else {
		clearInterval(intervalID);
		globalSimonVars.isInputReq=true;
		callback();
	}

}


function generateSeries(count, textID, limit, callbackForInput){
	//alert ("Game Started");
	$('#'+textID).val(count);
	var randSequence=[];
	
	//var delayVal=750;

	//play random sequence
	for (var i=0; i < count; i++){	
		//alert (i);//this will be a random number leading to random button presses
		randSequence.push(Math.floor(Math.random() * 4));
		
	}

	//storeRand = randSequence.slice();
	globalSimonVars.globalSeq = randSequence.slice();

	var intervalID=setInterval(function() {playAsound(randSequence, intervalID, function () {
		//await input from user
		console.log ("now getting input? "+globalSimonVars.isInputReq);
		console.log (globalSimonVars.globalSeq);
		//clearInterval(intervalID);
		callbackForInput();

	})},globalSimonVars.DELAY_VAL);

	console.log(randSequence);
	

}


//global buttons list
//need to place in global class




//old global variables
/*
	var simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
					  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
					  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
					  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};

	var seqKeys = Object.keys(simonButtons);
	var DELAY_VAL=1000;
	var COUNT_LIMIT=3;
	var isInputReq=false;
	var lastBtn='';
	var currentStage=10;
*/


function getUserInput () {
	//this is callback for input
	console.log("came to callback for input");
	var buttons = globalSimonVars.getButtons();
	if (globalSimonVars.isInputReq){
		for (button in buttons){
			console.log(buttons[button]);
			$('#'+buttons[button]).on("click", function(){
				globalSimonVars.lastBtn='#'+this.id;
				alert(globalSimonVars.lastBtn);

				if (globalSimonVars.globalSeq.length>1){
					globalSimonVars.globalSeq.shift();
					console.log(globalSimonVars.globalSeq);	
				} else {
					alert ("Stage Complete!");
					globalSimonVars.isInputReq=false;
					globalSimonVars.currentStage ++;
					generateSeries(globalSimonVars.currentStage,'stageCount', globalSimonVars.COUNT_LIMIT,getUserInput);
				}


			});
		}



	}


}

var globalSimonVars = new function(){


	this.simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
					  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
					  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
					  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};

	this.DELAY_VAL=700;
	this.COUNT_LIMIT=20;
	this.isInputReq=false;
	this.lastBtn='';
	this.currentStage=1;
	this.globalSeq=[];
	this.globalButtons=[];

	 this.setButtons = function () {
		this.globalButtons=prepareSimonButtons();
		return this.globalButtons;
	};

	this.getButtons = function (){
		return this.globalButtons;
	};

}

//main function
$(document).ready(function(){

	var isOn=togglePower(true, 'pwrBtn','startBtn');
	

	// /alert ("Hi, I'm the Simon game!");
	console.log(globalSimonVars.simonButtons);

	//var buttons=prepareSimonButtons();
	var buttons = globalSimonVars.setButtons();
	console.log(buttons);

	$("#pwrBtn").on("click", function(){
		isOn=togglePower(isOn, this.id, 'startBtn','isStrict');
		//console.log(isOn);
	});



	$("#startBtn").on("click", function(){
		//reset input Req
		globalSimonVars.isInputReq=false;
		$('#stageCount').val('--');
		$('#'+this.id).prop("disabled",true);
		$('#isStrict').prop("disabled", true);
		generateSeries(globalSimonVars.currentStage,'stageCount', globalSimonVars.COUNT_LIMIT,getUserInput);
		//generateSeries(1,'stageCount');
		
	});




});