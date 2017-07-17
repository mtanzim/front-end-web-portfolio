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
		console.log(timeLabel+':'+useTime);

		$('#timeLabel').html(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(Math.floor(useTime/60)+' minutes '+useTime%60+' seconds');
		$('#titleTime').html('');
		$('#titleTime').append(Math.floor(useTime/60)+':'+useTime%60);

		if (useTime===-1){
			clearInterval(intervalID);
			if (breakTime===-1){$('#timeH').html('Time Expired');}
			else{$('#timeH').html('');}
			alert("Time Expired");
			if (isWork){
				var intervalIDBreak= setInterval(function() {pomCount(false, intervalIDBreak)},delayVal);
				//isWork=false;
				/*
				if (breakTime===-1){
					clearInterval(intervalID);
					$('#timeH').html('Time Expired');
					alert("Time Expired");
					isWork=false;
				}
				*/
				
			}

		}

	}

	//alert("HI!");
	//harcode times for now
	var delayVal=1000;
	var workTime=25*60;
	var breakTime=5*60;


	var intervalID= setInterval(function() {pomCount(true, intervalID)},delayVal);
	
	

});