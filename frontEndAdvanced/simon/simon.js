


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
	console.log(Object.keys(simonButtons));

	//$('#simonButtons').append('<div class="col-md-3 btn-group">');
	//$('#simonButtons').append('<div class="row">');	
	for (var i in Object.keys(simonButtons)){
		//console.log(Object.keys(simonButtons)[i]);
		var curButton='btn_'+Object.keys(simonButtons)[i];
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


function togglePower (isOn, btnID, startID){
	//console.log(btnID	);

	if (isOn){
		isOn=false;
		$('#'+btnID).removeClass("btn-success");
		$('#'+btnID).addClass("btn-danger");
		$('#'+btnID).html("OFF");
		$('#'+startID).prop("disabled",true);
	}
	else {
		isOn=true;	
		$('#'+btnID).removeClass("btn-danger");
		$('#'+btnID).addClass("btn-success");
		$('#'+btnID).html("ON");
		$('#'+startID).prop("disabled",false);
	}
	return isOn;

}

function getUserInput (count){
	alert("awaiting input on count: "+count);
	return true;
}

function playAsound (sequence, seqKeys, intervalID){
	if (sequence.length>0){
		console.log ('start '+sequence);
		console.log ('playing sound:'+seqKeys[sequence[0]]);
		new Audio(simonButtons[seqKeys[sequence[0]]]).play();
		sequence.shift();
		console.log ('end' + sequence);
		playAsound(sequence, seqKeys, intervalID);
	} else {
		clearInterval(intervalID);
	}

}

function playSounds (sequence){

	var seqKeys = Object.keys(simonButtons);
	var delayVal=2000;
	//console.log(sequence);
	//console.log(seqKeys);

	var intervalID=setInterval(function() {playAsound(sequence, seqKeys, intervalID)},delayVal);

	if (intervalID===0){
		return 0;
	} else {
		console.log('waiting, intervalID: '+intervalID)
	}

	/*
	for (var i in sequence){
		alert ('playing sound:'+seqKeys[sequence[i]])	
		new Audio(simonButtons[seqKeys[sequence[i]]]).play()
	}
	*/

}

function generateSeries(count, textID, limit){
	//alert ("Game Started");
	$('#'+textID).val(count);
	var randSequence=[];
	//play random sequence
	for (var i=0; i < count; i++){	
		//alert (i);//this will be a random number leading to random button presses
		randSequence.push(Math.floor(Math.random() * 4));
		
	}

	console.log(randSequence);
	playSounds(randSequence);
	//await input from user
	var isCorrect=getUserInput(count);

	//repeat game x number of times
	if (count < limit && isCorrect){
		generateSeries(count+1,textID, limit);
	} else if (isCorrect===false) {
		generateSeries(count,textID, limit);
	}
}

//global buttons list
var simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
				  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
				  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
				  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};



//main function
$(document).ready(function(){

	var isOn=togglePower(true, 'pwrBtn','startBtn');
	var COUNT_LIMIT=5;

	// /alert ("Hi, I'm the Simon game!");
	console.log(simonButtons);

	var buttons=prepareSimonButtons();
	console.log(buttons);

	$("#pwrBtn").on("click", function(){
		isOn=togglePower(isOn, this.id, 'startBtn');
		//console.log(isOn);
	});

	$("#startBtn").on("click", function(){
		$('#stageCount').val('--');
		$('#'+this.id).prop("disabled",true);
		generateSeries(1,'stageCount', COUNT_LIMIT);
		//generateSeries(1,'stageCount');
		
	});

});