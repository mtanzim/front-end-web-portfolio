


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}



function prepareSimonButtons () {
	var simonButtons=['g','r','b','y'];
	//var bootstrapColWidth="col-md-3"
	var buttonList=[];

	//$('#simonButtons').append('<div class="col-md-3 btn-group">');
	//$('#simonButtons').append('<div class="row">');	
	for (var i in simonButtons){
		var curButton='btn_'+simonButtons[i];
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

function generateSeries(count, textID, limit){
	//alert ("Game Started");
	$('#'+textID).val(count);
	//play random sequence
	for (var i=0; i < count; i++){	
		alert (i);//this will be a random number leading to random button presses
	}
	//await input from user
	alert("awaiting input");
	//repeat game x number of times
	if (count < limit){
		generateSeries(count+1,textID, limit);
	}
}

//main function
$(document).ready(function(){

	var isOn=togglePower(true, 'pwrBtn','startBtn');
	var COUNT_LIMIT=7;

	// /alert ("Hi, I'm the Simon game!");

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