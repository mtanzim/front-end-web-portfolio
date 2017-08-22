


//found on stackoverflow
function pad (num, size){
	var s=num+""; //convert to string
	while (s.length <size) {
		s= "0"+s;
	}
	return s;
}


//creates a grid of buttons
function prepareGameBoard (divName) {

	var buttonList=[];
	var bootstrapColWidth="col-md-4 col-sm-4 col-xs-4"
	var gridOrder=[0,1,2,3,4,5,6,7,8];
	var btnClass="";
	for (var i in gridOrder){
		var curButton='btn_'+gridOrder[i];
		$(divName).append('<div class="'+bootstrapColWidth+'"><button type="button" id="'+curButton+'"class="'+btnClass+'well btn btn-default">'+''+'</button></div>');
		buttonList.push(curButton);
	}
	return buttonList;

}

function startGame(gameDiv) {

	
	var buttonList=globalTicTacVars.setButtons(gameDiv);
	console.log(buttonList);

	for (btnID in buttonList){
		console.log(buttonList[btnID]);
		$('#'+buttonList[btnID]).on("click", function(){
			alert(this.id);
		});

	}
	$(gameDiv).show();
	$(resetDiv).show();

}




var globalTicTacVars = new function(){


	this.globalButtons=[];
	this.isGlobalOn=false;
	this.numPlayers=0;
	this.P1Char='';
	this.P2Char='';

	this.resetGlobal = function(){
		this.globalButtons=[];
		this.isGlobalOn=false;
		this.numPlayers=0;
		this.P1Char='';
		this.P2Char='';
	}

	this.setButtons = function (gameDiv) {
		this.globalButtons=prepareGameBoard(gameDiv);
		return this.globalButtons;
	}
	this.getButtons = function (){
		return this.globalButtons;
	};
	this.setPlayers = function (numberPlayers){
		this.numPlayers=numberPlayers;
	}
	this.getPlayers = function (){
		return this.numPlayers;
	}
	this.setChar=function (p1CharSelect){
		this.P1Char=p1CharSelect;
		if (p1CharSelect==='X'){
			this.P2Char='O';
		} else {
			this.P2Char='X';
		}
	}
	this.getChar = function(){
		var charList=[];
		charList.push(this.P1Char);
		charList.push(this.P2Char);
		return charList;
	}




}





//main function
$(document).ready(function(){

	//alert ("Hi, I'm Tic Tac Toe!");
	var gameDiv="#gameArea";
	var pSelectDiv="#GameSelect";
	var P1SelectDiv="#CharSelectP1";
	
	//var P2SelectDiv="#CharSelectP2";

	var p1Button="#1player";
	var p1X="#1playerX";
	var p1O="#1playerO";

	var p2Button="#2player";
	//var p2X="#2playerX";
	//var p2O="#2playerO";
	var resetDiv="#resetDiv";
	var resetBtn="#resetBtn";

	$(P1SelectDiv).hide();
	$(resetDiv).hide();


	$(p1Button).on("click", function(){
		//alert("1 Player Selected");
		globalTicTacVars.setPlayers(1);
		console.log(globalTicTacVars.getPlayers());
		$(P1SelectDiv).show();
		$(pSelectDiv).hide();
	});
	$(p2Button).on("click", function(){
		//alert("2 Players Selected");
		globalTicTacVars.setPlayers(2);
		console.log(globalTicTacVars.getPlayers());
		$(P1SelectDiv).show();
		$(pSelectDiv).hide();
	});


	$(p1X).on("click", function(){
		//alert("2 Players Selected");
		globalTicTacVars.setChar('X');
		console.log(globalTicTacVars.getChar());
		$(P1SelectDiv).hide();
		startGame(gameDiv);
	});

	$(p1O).on("click", function(){
		//alert("2 Players Selected");
		globalTicTacVars.setChar('O');
		console.log(globalTicTacVars.getChar());
		$(P1SelectDiv).hide();
		startGame(gameDiv);
	});

	$(resetBtn).on("click", function(){
		globalTicTacVars.resetGlobal();
		$(P1SelectDiv).hide();
		$(resetDiv).hide();
		$(gameDiv).html('');
		$(pSelectDiv).show();
	});	




	//$(gameDiv).append('<div class="row text-center"><div class="col-md-4 col-md-offset-4"><p>Hello');



});