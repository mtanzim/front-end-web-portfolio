


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
	var btnClass="btn btn-default ticBtns well";
	for (var i in gridOrder){
		var curButton='btn_'+gridOrder[i];
		$(divName).append('<div class="'+bootstrapColWidth+'"><button type="button" id="'+curButton+'"class="'+btnClass+'">'+'<br>'+'</button></div>');
		buttonList.push(curButton);
	}
	return buttonList;
}

function alternateColors(btns){
	console.log('aternating colors for: '+btns);
	for (var i in btns){
		console.log(btns[i]);
		if($("#btn_"+btns[i]).hasClass('winBtn')){
			$("#btn_"+btns[i]).removeClass('winBtn');
			$("#btn_"+btns[i]).addClass('winBtnAlt');
		} else {
			$("#btn_"+btns[i]).addClass('winBtn');
			$("#btn_"+btns[i]).removeClass('winBtnAlt');
		}
	}
	//$(winBtn).addClass('winBtn');
	//$(winBtn).removeClass('winBtnAlt');
}


function rewardWin() {
	var winArr=globalTicTacVars.getWinner();
	for (var i in globalTicTacVars.getButtons()){
		$("#"+globalTicTacVars.getButtons()[i]).prop("disabled",true);
	}

	for (var j in winArr){
		$("#btn_"+winArr[j]).addClass('winBtn');
	}

	globalTicTacVars.setIntervalID(setInterval(function() {alternateColors(winArr);},globalTicTacVars.DELAY_VAL));
}

//this function will scan the game board and make decisions
//start off assuming 2 player game
function checkGame () {
	console.log('Last Player: '+globalTicTacVars.getCurChar());
	console.log('X has: '+globalTicTacVars.getGameStatus()['X']);
	console.log('O has: '+globalTicTacVars.getGameStatus()['O']);
	var turnsPlayed = globalTicTacVars.getGameStatus()['O'].length + globalTicTacVars.getGameStatus()['X'].length;
	console.log('Turns played: '+turnsPlayed);

	//var xList=globalTicTacVars.getGameStatus()['X'];
	//var oList=globalTicTacVars.getGameStatus()['O'];
	//console.log('X has: '+xList);
	//console.log('O has: '+oList);

	var isWon=false;
	var winCases = [
					[0,4,8], //diag1
					[2,4,6], //diag2
					[0,1,2], //hor1
					[3,4,5], //hor2
					[6,7,8], //hor3
					[0,3,6], //vert1
					[1,4,7], //vert2
					[2,5,8], //vert3
					];
	//algothim to check game end/tie
	if (globalTicTacVars.getGameStatus()[globalTicTacVars.getCurChar()].length > 2 && turnsPlayed < 10) {
		
		var curCheckArr=globalTicTacVars.getGameStatus()[globalTicTacVars.getCurChar()];
		console.log ('Checking if '+globalTicTacVars.getCurChar()+' won with: '+curCheckArr);
		
		for (var i in winCases){
			if (isWon){break;}
			var matchCount=0;
			console.log(winCases[i]);
			for (var j in curCheckArr){
				for (var k in winCases[i]){
					if (curCheckArr[j]===winCases[i][k]){
						matchCount++;
						if (matchCount===3){
							console.log(globalTicTacVars.getCurChar()+' won with: '+ winCases[i]);
							globalTicTacVars.setWinner(winCases[i]);
							isWon=true;
							break;
						}
					}
				}
			}
		}

	}

	if (isWon){
		rewardWin();
	}

	//console.log(winCases);

}


function startGame(gameDiv) {

	var buttonList=globalTicTacVars.setButtons(gameDiv);
	console.log(buttonList);

	globalTicTacVars.setCurChar();

	for (btnID in buttonList){
		console.log(buttonList[btnID]);
		$('#'+buttonList[btnID]).on("click", function(){
			//alert(this.id +' ' + globalTicTacVars.getCurChar());
			$('#'+this.id).html(globalTicTacVars.getCurChar());
			$("#"+this.id).prop("disabled",true);
			//maintain a list of X and O positions on the game board
			globalTicTacVars.updateGame(globalTicTacVars.getCurChar(),parseInt(this.id.split('_')[1]));
			//check game state
			checkGame();
			globalTicTacVars.toggleCurChar();
			//console.log (globalTicTacVars.getCurChar());
			

		});
	}
	$(gameDiv).show();
	$(resetDiv).show();
}

var globalTicTacVars = new function(){

	this.globalButtons=[];
	this.gameStatus ={'X':[],'O':[]};
	this.isGlobalOn=false;
	this.numPlayers=0;
	this.P1Char='';
	this.P2Char='';
	this.curChar='';
	this.winningArr=[];
	this.DELAY_VAL=1000;
	this.intervalID=0;

	this.resetGlobal = function(){
		this.globalButtons=[];
		this.gameStatus ={'X':[],'O':[]};
		this.isGlobalOn=false;
		this.numPlayers=0;
		this.P1Char='';
		this.P2Char='';
		this.curChar='';
		this.winningArr=[];

		clearInterval(this.intervalID);
		console.log('stopping intervalID');

	}

	this.setIntervalID=function(intervalID){
		this.intervalID=intervalID;
	}

	this.setWinner=function (winArr){
		this.winningArr=winArr.slice();
	}
	this.getWinner=function (){
		return this.winningArr.slice();
	}

	this.updateGame = function (char,pos) {
		this.gameStatus[char].push(pos);
	}
	this.getGameStatus = function(){
		return this.gameStatus;
	}

	this.toggleCurChar = function () {
		//console.log ("Toggling from: "+this.curChar)
		if (this.curChar===this.P1Char){
			this.curChar=this.P2Char;
		} else {
			this.curChar=this.P1Char;
		}
	}

	this.setCurChar = function() {
		this.curChar=this.P1Char;
	}
	this.getCurChar = function() {
		return this.curChar;
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

	var gameDiv="#gameArea";
	var pSelectDiv="#GameSelect";
	var P1SelectDiv="#CharSelectP1";

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

	//disable 1 player game for now
	$(p1Button).prop("disabled",true);


	//game type selection
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

	//P1 char selection
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
});