


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

function getUserInput (count, sequence, callback){
	console.log ("Need to match the following sequence: "+sequence);
	alert("awaiting input on count: "+count+ " for the following keys: "+ sequence);
	callback(true);
}

function playAsound (sequence, intervalID,callback){
	$('.simonBigBtn').css("opacity",'1.0');
	console.log();
	if (sequence.length>0){
		var btn_name=seqKeys[sequence[0]];

		console.log ('start '+sequence);
		console.log ('playing sound:'+btn_name);
		new Audio(simonButtons[btn_name]).play();
		$('#btn_'+btn_name).css("opacity",'0.5');


		sequence.shift();
		console.log ('end' + sequence);
	} else {
		clearInterval(intervalID);
		callback();
	}

}


function generateSeries(count, textID, limit){
	//alert ("Game Started");
	$('#'+textID).val(count);
	var randSequence=[];
	
	//var delayVal=750;

	//play random sequence
	for (var i=0; i < count; i++){	
		//alert (i);//this will be a random number leading to random button presses
		randSequence.push(Math.floor(Math.random() * 4));
		
	}

	storeRand = randSequence.slice();

	var intervalID=setInterval(function() {playAsound(randSequence, intervalID, function () {
		//await input from user
		console.log ("now getting input!");
		console.log (storeRand);
		getUserInput(count, storeRand, function(isCorrect){
			//repeat game x number of times
			//need this in a callback as well
			if (count < limit && isCorrect){
				generateSeries(count+1,textID, limit);
			} else if (isCorrect===false) {
				generateSeries(count,textID, limit);
			}
		});





	})},DELAY_VAL);

	console.log(randSequence);

}

//global buttons list
var simonButtons={'g':'https://s3.amazonaws.com/freecodecamp/simonSound1.mp3',
				  'r':'https://s3.amazonaws.com/freecodecamp/simonSound2.mp3',
				  'b':'https://s3.amazonaws.com/freecodecamp/simonSound3.mp3',
				  'y':'https://s3.amazonaws.com/freecodecamp/simonSound4.mp3'};

var seqKeys = Object.keys(simonButtons);
var DELAY_VAL=1000;
var COUNT_LIMIT=10;

//main function
$(document).ready(function(){

	var isOn=togglePower(true, 'pwrBtn','startBtn');
	

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