//main function





$(document).ready(function(){


	function pomCount(isWork, intervalID){

		
		//var totalWorkTime=minutes*60;
		//var totalBreakTime=breakTime*60;
		var useTime=workTime;
		var timeLabel='Work'
		if (isWork){workTime --;}
		else {breakTime--;useTime=breakTime;timeLabel='Break'}

		//console.log('came here');
		console.log('time:'+workTime);

		$('#timeLabel').html(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(Math.floor(useTime/60)+' minutes '+useTime%60+' seconds');

		if (useTime===0){
			clearInterval(intervalID);
			alert("Expired");
			$('#timeH').html('Time Expired');
			//var intervalIDBreak= setInterval(function() {pomCount(false, intervalIDBreak)},delayVal);

		}

	}

	//alert("HI!");
	//harcode times for now
	var delayVal=100;
	var workTime=1*60;
	var breakTime=2*60;


	var intervalID= setInterval(function() {pomCount(true, intervalID)},delayVal);
	
	

});