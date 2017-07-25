


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
		$("#resetBtn").fadeOut("slow");
		$("#stopBtn").fadeIn("slow");
		$("#workCtrlDiv").fadeTo("slow",0);
		$("#breakCtrlDiv").fadeTo("slow",0);
		$("#infoDiv").fadeTo("fast",1);
	}
	else if (state==='stopped'){
		$("#startBtn").fadeIn("slow");
		$("#stopBtn").fadeOut("slow");
		$("#resetBtn").fadeIn("slow");
		$("#workCtrlDiv").fadeTo("fast",0);
		$("#breakCtrlDiv").fadeTo("fast",0);
	}
	else if (state==='init'){
		$("#infoDiv").hide();
		$("#stopBtn").hide();
		$("#resetBtn").hide();
	}
	else if (state==='reset'){
		$('#timeLabel').html('');
		$('#timeH').html('');
		$("#infoDiv").fadeTo("fast",0);
		$("#startBtn").fadeIn("slow");
		$("#stopBtn").fadeOut("slow");
		$("#resetBtn").fadeOut("slow");
		$("#workCtrlDiv").fadeTo("fast",1);
		$("#breakCtrlDiv").fadeTo("fast",1);

	}
}


//main function
$(document).ready(function(){

	function resetTimes(){
		workMin=parseInt($("#workLength").text());
		workTime=workMin*60;
		breakMin=parseInt($("#breakLength").text());
		breakTime=breakMin*60;
	}
	function setTimes(isBreak, isAdd){
		if(isBreak) {
			if (isAdd){
				breakMin++;
				console.log('added break');
			} else {breakMin--;console.log('less break');}
			breakTime=breakMin*60;
			$('#breakLength').html(breakMin);

		}
		else {
			if (isAdd){
				workMin++;
				console.log('added work');
			} else {workMin--;console.log('less work');}
			workTime=workMin*60;
			$('#workLength').html(workMin);
			$('#timeLabel').html('');
			$('#timeH').html('');
		}
	}

	function reset () {
		pomCount(intervalID,'reset');
		toggleButtons('reset');
		$('#titleTime').html('Complete');
		$("#startBtn").removeClass("disabled");
		isItWork=true;
		isDisabled=false;
		resetTimes();
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

	var delayVal=1000;
	var workMin=parseInt($("#workLength").text());
	var workTime=workMin*60;
	var breakMin=parseInt($("#breakLength").text());
	var breakTime=breakMin*60;
	var intervalID=0;
	var prevInterval=0;
	var isItWork=true;


	var isDisabled = document.getElementById("startBtn").disabled;
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
		pomCount(intervalID,'stop');
		toggleButtons('stopped');
		$("#startBtn").removeClass("disabled");
		isDisabled=false;
	});

	$("#resetBtn").on("click", function(){
		reset();
	});
    
	//time buttons
	if (isDisabled===false){
		//work lengths
		$("#addWork").on("click", function(){
			setTimes(false,true);
	    });

		$("#lessWork").on("click", function(){
			if (workMin>1){
				setTimes(false,false);
			} else {
				alert ("Please select a valid time!");
			}
			workTime=workMin*60;
	    });

		//break lengths
		$("#addBreak").on("click", function(){
			setTimes(true,true);
				
	    });
		$("#lessBreak").on("click", function(){
			if (breakMin>1){
				setTimes(true,false);
			} else {
				alert ("Please select a valid time!");
			}
	    });
	}
		
		
	
	
	

});