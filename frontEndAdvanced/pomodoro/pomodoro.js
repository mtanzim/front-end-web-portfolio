//main function





$(document).ready(function(){


	function pomCount(isWork, intervalID){

		

		var useTime=workTime;
		var timeLabel='Work'
		if (isWork){workTime --;}
		else {breakTime--;useTime=breakTime;timeLabel='Break'}

		console.log(timeLabel+':'+useTime);

		$('#timeLabel').html(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(Math.floor(useTime/60)+' minutes '+useTime%60+' seconds');
		//$('#titleTime').preventDefault();
		$('#titleTime').html(timeLabel+": ");
		$('#titleTime').append(Math.floor(useTime/60)+':'+useTime%60);

		if (useTime===-1){
			$('#timeH').html(timeLabel + ' session complete.');
			$('#titleTime').html('Complete');
			clearInterval(intervalID);
			alert(timeLabel+ " Complete!");
			if (isWork){
				var intervalIDBreak= setInterval(function() {pomCount(false, intervalIDBreak)},delayVal);
				
			}
		}
	}

	//harcode times for now
	var delayVal=1000;
	var workTime=25*60;
	var breakTime=5*60;

	var intervalID= setInterval(function() {pomCount(true, intervalID)},delayVal);
	
	

});