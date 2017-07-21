


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}

function toggleButtons(state){

	if (state==='running'){
		
		$("#startBtn").fadeOut("slow");
		$("#stopBtn").fadeIn("slow");
		$("#workCtrlDiv").fadeTo("slow",0);
		$("#breakCtrlDiv").fadeTo("slow",0);
	}
	else if (state==='stopped'){
		$("#startBtn").fadeIn("slow");
		$("#stopBtn").fadeOut("slow");
		$("#resetBtn").fadeIn("slow");
		$("#workCtrlDiv").fadeTo("fast",0);
		$("#breakCtrlDiv").fadeTo("fast",0);
	}
	else if (state==='init'){
		//$("#startBtn").show();
		$("#stopBtn").hide();
		$("#resetBtn").hide();
	}
	else if (state==='reset'){
		$("#startBtn").fadeIn("slow");
		$("#stopBtn").fadeOut("slow");
		$("#resetBtn").fadeOut("slow");
		$("#workCtrlDiv").fadeTo("fast",1);
		$("#breakCtrlDiv").fadeTo("fast",1);
	}
}


//main function
$(document).ready(function(){

	function reset () {
		isItWork=true;
		workTime=10*60;
		breakTime=10*60;
		toggleButtons('reset');
		$("#startBtn").removeClass("disabled");
		isDisabled=false;
		pomCount(intervalID,'reset');
		$('#titleTime').html('Complete');
		//this is fucking up operations
	}


	function pomCount(intervalIDfunc, pomState){

		if (pomState==='reset'){
			clearInterval(intervalID);
			clearInterval(prevInterval);
			$('#timeH').html(timeLabel + ' session reset.');
		} else if (pomState==='stop') {
			prevInterval=intervalIDfunc;
			clearInterval(intervalIDfunc);
    	}

		var useTime=workTime;
		var timeLabel='Work'
		if (isItWork){workTime --;}
		else {breakTime--;useTime=breakTime;timeLabel='Break'}

		var minDisp=pad(Math.floor(useTime/60),2);
		var secDisp=pad(useTime%60,2);

		//console.log(timeLabel+':'+useTime);


		$('#timeLabel').html(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(minDisp+' minutes '+secDisp+' seconds');
		$('#titleTime').html(timeLabel+" ");
		$('#titleTime').append(minDisp+':'+secDisp);

		if (useTime<0){
			clearInterval(intervalID);
			$('#timeH').html(timeLabel + ' session complete.');
			$('#titleTime').html('Complete');
			alert(timeLabel+ " Complete!");
			if (isItWork){
				isItWork=false;
				clearInterval(intervalIDfunc);
				intervalID=setInterval(function() {pomCount(intervalIDfunc,'default')},delayVal);
			} else {
				reset();
			}
		}
	}

	//harcode times for now
	var delayVal=10;
	var workTime=100*60;
	var breakTime=150*60;
	var intervalID=0;
	var prevInterval=0;
	var isItWork=true;


	var isDisabled = document.getElementById("startBtn").disabled;
	console.log($("#workLength").text());
	//console.log($("#workLength").text());
	toggleButtons('init');


	$("#startBtn").on("click", function(){
		toggleButtons('running');
		console.log(isDisabled)

		if (isDisabled===false){
			$("#startBtn").addClass("disabled");
			isDisabled=true;
			intervalID=prevInterval;
			intervalID= setInterval(function() {pomCount(intervalID, false)},delayVal);
		}
		
    });
	$("#stopBtn").on("click", function(){
		toggleButtons('stopped');
		pomCount(intervalID,'stop');
		$("#startBtn").removeClass("disabled");
		isDisabled=false;

	});

	$("#resetBtn").on("click", function(){
		//delayVal=10; //speed things up
		reset();



	});
    

	$("#addWork").on("click", function(){
		alert("added work")
    });
	
	
	

});