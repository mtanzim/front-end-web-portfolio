


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
		
		if (globalSimonVars.currentStage>1){
			alert("Game Over!");
		}
		globalSimonVars.currentStage=1;
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
	$('#stageCount').val(globalSimonVars.currentStage);
	return isOn;

}


function playAsound (sequence, intervalID){
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
		globalSimonVars.isInputReq=true;
		clearInterval(intervalID);
	}
}


function generateSeries(){
	//alert ("Game Started");
	$('#stageCount').val(globalSimonVars.currentStage);
	var randSequence=[];
	//play random sequence
	for (var i=0; i < globalSimonVars.currentStage; i++){	
		//alert (i);//this will be a random number leading to random button presses
		randSequence.push(Math.floor(Math.random() * 4));
		
	}

	//storeRand = randSequence.slice();
	globalSimonVars.globalSeq = randSequence.slice();

	var intervalID=setInterval(function() {playAsound(randSequence, intervalID)},globalSimonVars.DELAY_VAL);

	console.log(randSequence);
	

}


function checkInput(btnID) {
	//alert ('pressed '+btnID );

	if (globalSimonVars.isInputReq===true && globalSimonVars.globalSeq.length>0){

		var curSeqVal=globalSimonVars.globalSeq[0];
		var curSeqBtn=globalSimonVars.getButtons()[curSeqVal];
		console.log("Checking input!");
		console.log(curSeqBtn);
		console.log(btnID);
		if (btnID===curSeqBtn) {
			//alert ("correct!");
			globalSimonVars.globalSeq.shift();
			if (globalSimonVars.globalSeq.length===0){
				alert ("Stage Complete!");
				globalSimonVars.currentStage ++;
				globalSimonVars.isInputReq=false;
				if (globalSimonVars.currentStage <= globalSimonVars.COUNT_LIMIT){
					generateSeries();
				} else {
					globalSimonVars.currentStage=1;
					alert("Game Over!");
					globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn', 'startBtn','isStrict');

				}
			}

		} else {

			if ($("#isStrict").prop('checked')){
				alert ("Incorrect! Game Over.");
				globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn', 'startBtn','isStrict');
				
				//enable below to auto restart
				//globalSimonVars.currentStage=1;
				//globalSimonVars.isInputReq=false;
				//generateSeries();
			} else {
				alert ("Incorrect! Restarting Stage.");
				//restart the same stage based on strict or not strict
				generateSeries();
			}
		}
		console.log(globalSimonVars.globalSeq);

	}

}



var globalSimonVars = new function(){


	this.simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
					  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
					  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
					  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};

	this.DELAY_VAL=700;
	this.COUNT_LIMIT=6;
	this.isInputReq=false;
	this.lastBtn='';
	this.currentStage=1;
	this.globalSeq=[];
	this.globalButtons=[];
	this.isCorrect=false;
	this.isGlobalOn=false;

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

	globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn','startBtn');
	

	// /alert ("Hi, I'm the Simon game!");
	console.log(globalSimonVars.simonButtons);

	//var buttons=prepareSimonButtons();
	var buttons = globalSimonVars.setButtons();
	console.log(buttons);

	$("#pwrBtn").on("click", function(){
		globalSimonVars.isGlobalOn=togglePower(globalSimonVars.isGlobalOn, this.id, 'startBtn','isStrict');
		//console.log(isOn);
	});



	$("#startBtn").on("click", function(){
		//reset input Req
		globalSimonVars.isInputReq=false;
		$('#stageCount').val('--');
		$('#'+this.id).prop("disabled",true);
		$('#isStrict').prop("disabled", true);
		//generateSeries(globalSimonVars.currentStage,'stageCount', globalSimonVars.COUNT_LIMIT);
		//generateSeries(1,'stageCount');
		generateSeries();
		
	});

	$('#btn_g').on("click", function(){checkInput(this.id);});
	$('#btn_r').on("click", function(){checkInput(this.id);});
	$('#btn_b').on("click", function(){checkInput(this.id);});
	$('#btn_y').on("click", function(){checkInput(this.id);});




});