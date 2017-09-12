//script for pomodor clock
//Tanzim Mokammel
//mtanzim@gmail.com


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
		$('#pomJumbo').hide();
		$("#startBtn").hide();
		//$("#resetBtn").removeClass('hider');
		//$("#resetBtn").show();
		$("#resetBtn").addClass('hider');
		$(".ctrlDiv").hide();
		$("#infoDiv").removeClass('hider');
		$("#infoDiv").show();
	}
	else if (state==='stopped'){
		$("#resetBtn").removeClass('hider');
		//$("#resetBtn").show();
		//$(".ctrlDiv").fadeOut("slow");
	}
	else if (state==='init'){
		$("#infoDiv").hide();
		//$("#stopBtn").hide();
		//$("#resetBtn").hide();
	}
	else if (state==='reset'){
		$('#timeLabel').html('');
		$('#timeH').html('');
		$("#infoDiv").hide();
		//$("#resetBtn").hide();
		$("#resetBtn").addClass('hider');
		$("#startBtn").fadeIn("slow");
		$('#pomJumbo').fadeIn("slow");
		$(".ctrlDiv").fadeIn("slow");


	}

	return state;
}

//main function
$(document).ready(function(){



	//enable bootstrap tooltips
	$('[data-toggle="tooltip"]').tooltip();

	function resetTimes(){
		workMin=parseInt($("#workLength").text());
		workTime=workMin*60;
		startWorkTime=workTime;
		breakMin=parseInt($("#breakLength").text());
		breakTime=breakMin*60;
		startBreakTime=breakTime;
		//progBar='100%';
	}
	function setTimes(isBreak, isAdd){
		if(isBreak) {
			if (isAdd){
				breakMin++;
				console.log('added break');
			} else {breakMin--;console.log('less break');}
			breakTime=breakMin*60;
			startBreakTime=breakTime;
			//startWorkTime=workTime;
			$('#breakLength').html(pad(breakMin,2));

		}
		else {
			if (isAdd){
				workMin++;
				console.log('added work');
			} else {workMin--;console.log('less work');}
			workTime=workMin*60;
			startWorkTime=workTime;
			$('#workLength').html(pad(workMin,2));
			$('#timeLabel').html('');
			$('#timeH').html('');
		}
	}
  
  
  function resetL2 () {
    toggleButtons('reset');
    $('#titleTime').html('Complete');
    $("#startBtn").removeClass("disabled");
    isItWork=true;
    isDisabled=false;
    resetTimes();
  }

	function reset (timeLabelres, isNatural,audPlay) {

	pomCount(intervalID,'reset');

		if (isNatural) {
			audPlay.play();
			console.log(audPlay);
	    //this is needed to avoid chrome preventing background audio, and this site progression
    	if (document.hasFocus()){
        $(audPlay).on("ended", function() { 
	  		alert(timeLabelres + " Complete!");
        resetL2();
      });
  		} else {
	      alert(timeLabelres + " Complete!");
	      resetL2();
    	}
		} else {
      resetL2();
    }
	}


	function pomCount(intervalIDfunc, pomState){

		if (pomState==='reset'){
			clearInterval(intervalID);
			clearInterval(prevInterval);
			timeLabel='Work';
			circleProg.set(0);
			circleProg.setText('');
			//$('#timeH').html(timeLabel + ' session reset.');
			//progBar='100%';
			return 0;
		} else if (pomState==='stop') {
			prevInterval=intervalIDfunc;
			clearInterval(intervalIDfunc);
			workTime=timeLeft;
			return 0;
    	}

		//var timeLabel='';
		//var useTime=workTime;
		//if (isItWork){timeLabel='Work';}
		//else {timeLabel='Break';}
		

		//update timing functions to use getTime instead of relying on accuracy of setInterval
		var pomNow = new Date().getTime();
		//if (isItWork){workTime --;}
		//else {breakTime--;useTime=breakTime;timeLabel='Break'}

		var useTime=workTime-((pomNow-startTime)/(1000*timeSpeedFactor));
		//keep track of time left in case it's stopped
		timeLeft=useTime;

		var minDisp=pad(Math.floor(useTime/60),2);
		var secDisp=pad(parseInt(useTime%60.0),2);


		circleProg.setText(timeLabel);
		$('#timeH').html('');
		$('#timeH').append(minDisp+' minutes '+secDisp+' seconds');
		$('#titleTime').html(timeLabel+" ");
		$('#titleTime').append(minDisp+':'+secDisp);

		//circle.animate(useTime/startWorkTime);

		if (isItWork){
			progBar=Math.floor((useTime/startWorkTime)*100).toString()+'%';
			circleProg.set(useTime/startWorkTime);
			//console.log(useTime/startWorkTime);
		} else {
			progBar=Math.floor((useTime/startBreakTime)*100).toString()+'%';
			circleProg.set(useTime/startBreakTime);
			//console.log(useTime/startBreakTime);
		}

		if (useTime<0){
			//new Audio('audio/clock-tick8.mp3').play();
			$('#timeH').html(timeLabel + ' session complete.');
			$('#titleTime').html('Complete');

			//ensure empty circle
  		circleProg.set(0);
			circleProg.setText('');
			//play a sound
			var audPlay=new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
			
			if (isItWork){
				isItWork=false;
				clearInterval(intervalIDfunc);
        
        //this is needed to avoid chrome preventing background audio, and this site progression
        audPlay.play();
        console.log(audPlay);
        if (document.hasFocus()){
          $(audPlay).on("ended", function() {
              alert(timeLabel+ " Complete!");
          });
        } else {
          alert(timeLabel+ " Complete!");
        }
        timeLabel='Break';
        //update times for break session
        startTime=new Date().getTime();
        workTime=breakTime;
        intervalID=setInterval(function() {pomCount(intervalIDfunc,'default')},delayVal);

			} else {
				reset(timeLabel, true,audPlay);
				timeLabel='Work';
			}

		}
	}


	//page variables
	var delayVal=1000;
	var timeSpeedFactor=1;
	var workMin=parseInt($("#workLength").text());
	var workTime=workMin*60;
	var startWorkTime=workTime;
	var breakMin=parseInt($("#breakLength").text());
	var breakTime=breakMin*60;
	var startBreakTime=breakTime;
	var intervalID=0;
	var prevInterval=0;
	var isItWork=true;
	var pomState='';
	var startTime=new Date().getTime();	
	//keeps track of number of seconds left when stopped
	var timeLeft=startTime;
	//var progBar='100%';
	var timeLabel='Work';

	//Circle Prog bar from below
	//http://progressbarjs.readthedocs.io/en/latest/api/shape/
    var circleProg = new ProgressBar.Circle('#progressCir', {
        color: '#b7b7b7',
        strokeWidth: 1.0,
        //trailColor: 'red',
        //trailWidth: 1.0,
        //duration: workTime,
        //easing: 'easeInOut'
    	svgStyle: {
        	display: 'block',
        	width: '100%'
		},
		text: {
			className:'progressbar-text',
			style: {
				color:'#b7b7b7'		
			}
			
		}

    });


	var isDisabled = document.getElementById("startBtn").disabled;

	pomState=toggleButtons('init');

	function startFunc () {

		//update startTime to indicate start of work
		startTime=new Date().getTime();
		console.log(startTime);

		pomState=toggleButtons('running');
		console.log(pomState);
		console.log(isDisabled);

		if (isDisabled===false){
			$("#startBtn").addClass("disabled");
			isDisabled=true;
			intervalID=prevInterval;
			//circleWorkProg.animate(1);
			//add filler to avoid delayed response effect from set interval
			//circleProg.set(1);
			circleProg.setText('Start!');
			//$('#timeH').html(workMin+' minutes 00 seconds');
			toggleTooltip('stop');
			intervalID= setInterval(function() {pomCount(intervalID, false)},delayVal);

		}
	}

	function stopFunc() {
		pomCount(intervalID,'stop');
		pomState=toggleButtons('stopped');
		circleProg.setText('Paused');
		console.log(pomState);
		$("#startBtn").removeClass("disabled");
		isDisabled=false;

	}
	function resetFunc(){
		pomState=reset('',false);
		console.log(pomState);
	}

	function toggleTooltip (tipState) {
		$("#progressCir").tooltip('hide')
      			.attr('data-original-title', 'Click to '+tipState)
      			.tooltip('fixTitle')
      			//.tooltip('show');

	}



	$("#startBtn").on("click", startFunc);
	$("#resetBtn").on("click", reset);
	$("#progressCir").on("click",function(){
		if (pomState==='running'){
			toggleTooltip('start');
			stopFunc();
		} else {
			toggleTooltip('stop');
			startFunc();
		}
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
			//workTime=workMin*60;
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