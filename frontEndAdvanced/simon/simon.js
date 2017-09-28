//script for simon game
//Tanzim Mokammel
//mtanzim@gmail.com

function prepareSimonButtons () {

	var buttonList=[];
	var simonBtnClasses="simonBigBtn";
	console.log(Object.keys(globalSimonVars.simonButtons));


	for (var i in Object.keys(globalSimonVars.simonButtons)){
		var curButton='btn_'+Object.keys(globalSimonVars.simonButtons)[i];
		$('#simonButtons').append('<button type="button" id="'+curButton+'" class="'+simonBtnClasses+'"></button>');
		buttonList.push(curButton);
	}

	$('#simonButtons').append('</div>');
	return buttonList;

}


function togglePower (isOn, btnID, startID, strictID){
	//console.log(btnID	);

	if (isOn){
		globalSimonVars.reset();
		isOn=false;
		globalSimonVars.isInputReq=false;
		
		if (globalSimonVars.currentStage>1){
			//alert("Game Over!");
		}
		globalSimonVars.currentStage=1;
		$('#'+btnID).removeClass("btn-success");
		$('#'+btnID).addClass("btn-danger");
		$('#'+btnID).html("OFF");
		$('#'+startID).prop("disabled",true);
		$('#'+strictID).prop("disabled",true);
		$('#stageCount').val('Power on, then start game.');
		

	}
	else {
		isOn=true;	
		$('#'+btnID).removeClass("btn-danger");
		$('#'+btnID).addClass("btn-success");
		$('#'+btnID).html("ON&nbsp");
		$('#'+startID).prop("disabled",false);
		$('#'+strictID).prop("disabled",false);
		
		$('#stageCount').val('Press Start to begin game.');
	}

		
	return isOn;

}


function playAsound (){
	var sequence=globalSimonVars.globalSeq;
	var defOpacity='0.7';
	var pressedOpacity='1.0';
	var translateVal='translateY(4px)';


	$('#stageCount').val('Stage: '+globalSimonVars.currentStage);
	globalSimonVars.isInputReq=false;
	$('.simonBigBtn').css("opacity",pressedOpacity);
	$('.simonBigBtn').css("transform",translateVal);
	console.log('passed sequence is: '+sequence);
	if (sequence.length>0){
		var seqKeys = Object.keys(globalSimonVars.simonButtons);
		var btn_name=seqKeys[sequence[0]];

		console.log ('start '+sequence);
		console.log ('playing sound:'+btn_name);
		new Audio(globalSimonVars.simonButtons[btn_name]).play();
		$('#btn_'+btn_name).css("opacity",defOpacity);
		sequence.shift();
		console.log ('end: ' + sequence);
	} else {
		globalSimonVars.isInputReq=true;
		//restore the sequence
		globalSimonVars.globalSeq=globalSimonVars.globalStoreSeq.slice();
		clearInterval(globalSimonVars.intervalID);
	}
}


function generateSeries(isIncr){
	//alert ("Game Started");
	//$('#stageCount').val('Stage: '+globalSimonVars.currentStage);
	//var randSequence=[];
	//modify this to add only one to the sequence every time
	//play random sequence

	/*
	for (var i=0; i < globalSimonVars.currentStage; i++){	
		//alert (i);//this will be a random number leading to random button presses
		randSequence.push(Math.floor(Math.random() * 4));
		
	}
	*/

	//storeRand = randSequence.slice();
	//globalSimonVars.globalSeq = randSequence.slice();
	if (isIncr){
		globalSimonVars.globalSeq.push(Math.floor(Math.random() * 4));
	}
	console.log(globalSimonVars.globalSeq);

	//store the original sequence
	globalSimonVars.globalStoreSeq=globalSimonVars.globalSeq.slice();
 	globalSimonVars.intervalID=setInterval(function() {playAsound();},globalSimonVars.DELAY_VAL);

	
	

}


function checkInput(btnID) {
	console.log ('pressed '+btnID );
	if (globalSimonVars.isInputReq===true && globalSimonVars.globalSeq.length>0){

		var curSeqVal=globalSimonVars.globalSeq[0];
		var curSeqBtn=globalSimonVars.getButtons()[curSeqVal];
		console.log("Checking input!");
		console.log(curSeqBtn);
		console.log(btnID);

		new Audio(globalSimonVars.simonButtons[btnID.split('_')[1]]).play();

		if (btnID===curSeqBtn) {
			//alert ("correct!");
			globalSimonVars.globalSeq.shift();
			if (globalSimonVars.globalSeq.length===0){
				
				globalSimonVars.currentStage ++;
				globalSimonVars.isInputReq=false;
				$('#stageCount').val('Stage Complete!');
				setTimeout(function(){
					//alert ("Stage Complete!");
					
					if (globalSimonVars.currentStage <= globalSimonVars.COUNT_LIMIT && globalSimonVars.isGlobalOn){
						//restore the sequence
						globalSimonVars.globalSeq=globalSimonVars.globalStoreSeq.slice();
						generateSeries(true);
					} else {
						if (globalSimonVars.isGlobalOn){
							//alert('You Win!');
							$('#stageCount').val("YOU WON!!!");
							setTimeout(function(){
								//globalSimonVars.currentStage=1;
								globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn', 'startBtn','isStrict');
							},globalSimonVars.DELAY_VAL_RST*3);
						} else {
						//globalSimonVars.currentStage=1;
						//alert("Game Over!");
							globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn', 'startBtn','isStrict');
						}

					}
				},globalSimonVars.DELAY_VAL_RST);
			}

		} else {
			//restart the same stage based on strict or not strict
			globalSimonVars.isInputReq=false;
			if ($("#isStrict").prop('checked')){
				$('#stageCount').val("Incorrect! Game Over.");
				//alert("Game Over!");
				setTimeout( function() {
					globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn', 'startBtn','isStrict');
				}, globalSimonVars.DELAY_VAL_RST);
				//enable below to auto restart
				//globalSimonVars.currentStage=1;
				//globalSimonVars.isInputReq=false;
				//generateSeries();
			} else {
				//restore the sequence
				globalSimonVars.globalSeq=globalSimonVars.globalStoreSeq.slice();
				$('#stageCount').val("Incorrect! Restarting Stage.");
				setTimeout( function() {generateSeries(false);},globalSimonVars.DELAY_VAL_RST);
			}
		}
		console.log(globalSimonVars.globalSeq);

	} else {
		//var curStageVal=$('#stageCount').val();
		$('#stageCount').val('Buttons currently disabled!');
		//setTimeout( function() {$('#stageCount').val(curStageVal);},globalSimonVars.DELAY_VAL_RST);
	}

}



var globalSimonVars = new function(){


	this.simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
					  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
					  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
					  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};

	this.DELAY_VAL=700;
	this.DELAY_VAL_RST=1400;
	this.COUNT_LIMIT=3; //max number of stages
	this.isInputReq=false;
	this.lastBtn='';
	this.currentStage=1;
	this.globalSeq=[];
	this.globalStoreSeq=[];
	this.globalButtons=[];
	this.isCorrect=false;
	this.isGlobalOn=false;
	this.intervalID=0;

 	this.setButtons = function () {
		this.globalButtons=prepareSimonButtons();
		return this.globalButtons;
	};

	this.getButtons = function (){
		return this.globalButtons;
	};

	this.reset = function () {
		this.globalSeq=[];
		this.globalStoreSeq=[];
		this.currentStage=1;
		clearInterval(this.intervalID);
		console.log('Reset!');
	}

}

//main function
$(document).ready(function(){

	globalSimonVars.isGlobalOn=togglePower(true, 'pwrBtn','startBtn');
	

	// /alert ("Hi, I'm the Simon game!");
	console.log(globalSimonVars.simonButtons);

	//var buttons=prepareSimonButtons();
	var buttons = globalSimonVars.setButtons();
	console.log(buttons);

	$('#stageCount').prop('disabled',true);
	$('#stageCount').val('Power on, then start game.');

	$("#pwrBtn").on("click", function(){
		globalSimonVars.isGlobalOn=togglePower(globalSimonVars.isGlobalOn, this.id, 'startBtn','isStrict');
		
	});


	$("#startBtn").on("click", function(){
		//reset input Req
		globalSimonVars.isInputReq=false;
		$('#stageCount').val('--');
		$('#'+this.id).prop("disabled",true);
		$('#isStrict').prop("disabled", true);
		//generateSeries(globalSimonVars.currentStage,'stageCount', globalSimonVars.COUNT_LIMIT);
		//generateSeries(1,'stageCount');
		generateSeries(true);
		
	});


	$('#btn_g').on("click", function(){checkInput(this.id);});
	$('#btn_r').on("click", function(){checkInput(this.id);});
	$('#btn_b').on("click", function(){checkInput(this.id);});
	$('#btn_y').on("click", function(){checkInput(this.id);});

});