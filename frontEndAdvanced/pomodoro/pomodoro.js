


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


	function pomCount(isWork, intervalID){

		var useTime=workTime;
		var timeLabel='Work'
		isItWork=isWork;
		if (isWork){workTime --;}
		else {breakTime--;useTime=breakTime;timeLabel='Break'}

		var minDisp=pad(Math.floor(useTime/60),2);
		var secDisp=pad(useTime%60,2);

		console.log(timeLabel+':'+useTime);

		$('#timeLabel').html(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(minDisp+' minutes '+secDisp+' seconds');
		$('#titleTime').html(timeLabel+" ");
		$('#titleTime').append(minDisp+':'+secDisp);


		$("#stopBtn").on("click", function(){
			prevInterval=intervalID;
			clearInterval(intervalID);
    	});
		$("#resetBtn").on("click", function(){
			clearInterval(intervalID);
			clearInterval(prevInterval);
			//reset clocks
			$('#timeH').html(timeLabel + ' session reset.');
			$('#titleTime').html('Complete');
			workTime=1*60;
			breakTime=1*60;
			isItWork=true;

    	});


		if (useTime<0){
			clearInterval(intervalID);
			$('#timeH').html(timeLabel + ' session complete.');
			$('#titleTime').html('Complete');
			alert(timeLabel+ " Complete!");
			if (isWork){
				intervalID=setInterval(function() {pomCount(false, intervalID)},delayVal);
			}
		}
	}

	//harcode times for now
	var delayVal=100;
	var workTime=1*60;
	var breakTime=1*60;
	var intervalID=0;
	var prevInterval=0;
	var isItWork=true;


	$("#startBtn").on("click", function(){
		intervalID=prevInterval;
		intervalID= setInterval(function() {pomCount(isItWork, intervalID)},delayVal);
    });

	$("#addWork").on("click", function(){
		alert("added work")
    });
	
	
	

});