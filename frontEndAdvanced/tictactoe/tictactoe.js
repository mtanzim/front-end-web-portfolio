//script for tic tac toe game
//Tanzim Mokammel
//mtanzim@gmail.com


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


//AI code
//assumes P1 is always human
//has redundant code, consider refactoring
//redundant winCase arrays are used to avoid altering the deFacto winCase array
//alternate, and less bloated code would be to make copies and restore, similar to simon game
function engageAI(AIchar,playerChar) {

	var AIstat=globalTicTacVars.getGameStatus()[AIchar];
	var playerStat=globalTicTacVars.getGameStatus()[playerChar];
	//var playerChar='';

	console.log ('AI ' + AIchar + ' Stat: '+AIstat);
	console.log ('Player ' + playerChar + ' Stat: '+playerStat);

	var AIcompleted=false;
	var playerBlocked=false;

	//check if AI can complete
	if (AIstat.length>1){
		console.log('AI can possibly complete. Checking...');
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

		for (var i in winCases){
			if (AIcompleted){break;}
			var matchCount=0;
			//console.log(winCases[i]);
			for (var j in AIstat){
				for (var k in winCases[i]){
					if (AIstat[j]===winCases[i][k]){
						//console.log('matched ' + winCases[i][k] + ' at ' + k);
						matchCount++;
						winCases[i].splice(k,1);
						//console.log ('spliced, new arr: '+ winCases[i]);
						if (matchCount===2){
							console.log(AIchar+' can win with: '+ winCases[i]);
							//check if location is blocked
							if (playerStat.includes(winCases[i][0]) || AIstat.includes(winCases[i][0])){
								console.log('location blocked');
							} else {
								AIcompleted=true;
								//actually play the location
								console.log("AI Playing Now");
								//visual update
								$('#btn_'+winCases[i][0]).html(globalTicTacVars.getCurChar());
								$("#btn_"+winCases[i][0]).prop("disabled",true);
								//maintain a list of X and O positions on the game board
								globalTicTacVars.updateGame(globalTicTacVars.getCurChar(),winCases[i][0]);
								//check game state
								checkGame();
								//set correct states
								break;
							}
							
						}
					}
				}
			}
		}
	}
	//AI can't complete, try to block
	if (AIcompleted===false && playerStat.length>1){
		console.log('AI cannot complete, try blocking player');
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
		for (var i in winCases){
			if (playerBlocked){break;}
			var matchCount=0;
			//console.log(winCases[i]);
			for (var j in playerStat){
				for (var k in winCases[i]){
					if (playerStat[j]===winCases[i][k]){
						//console.log('matched ' + winCases[i][k] + ' at ' + k);
						matchCount++;
						winCases[i].splice(k,1);
						//console.log ('spliced, new arr: '+ winCases[i]);
						if (matchCount===2){
							console.log(playerChar+' can win with: '+ winCases[i]);
							//check if location is blocked
							if (playerStat.includes(winCases[i][0]) || AIstat.includes(winCases[i][0])){
								console.log('location blocked');
							} else {
								//actually play the location
								playerBlocked=true;
								//actually play the location
								console.log("AI Playing Now");
								//visual update
								$('#btn_'+winCases[i][0]).html(globalTicTacVars.getCurChar());
								$("#btn_"+winCases[i][0]).prop("disabled",true);
								//maintain a list of X and O positions on the game board
								globalTicTacVars.updateGame(globalTicTacVars.getCurChar(),winCases[i][0]);
								//check game state
								checkGame();
								//set correct states	
								break;
							}
							
						}
					}
				}
			}
		}
		
	}
	//AI can't complete or block, play a random game location
	if (AIcompleted===false && playerBlocked===false){
		var gaps=[];
		var allPos=[0,1,2,3,4,5,6,7,8];
		for (var m in allPos){
			if (AIstat.includes(allPos[m])===false && playerStat.includes(allPos[m])==false){
				gaps.push(allPos[m]);
			}
		}
		console.log('Gaps: ' + gaps);
		var toPlay = gaps[Math.floor(Math.random()*gaps.length)];
		console.log("AI Playing Now");
		//visual update
		$('#btn_'+toPlay).html(globalTicTacVars.getCurChar());
		$("#btn_"+toPlay).prop("disabled",true);
		//maintain a list of X and O positions on the game board
		globalTicTacVars.updateGame(globalTicTacVars.getCurChar(),toPlay);
		//renable gaps as AI has played
		//check game state
		checkGame();
	}

}

//this function will scan the game board and make decisions
//start off assuming 2 player game
function checkGame () {

	var turnsPlayed = globalTicTacVars.getGameStatus()['O'].length + globalTicTacVars.getGameStatus()['X'].length;

	//console.log('Last Player: '+globalTicTacVars.getCurChar());
	console.log('X has: '+globalTicTacVars.getGameStatus()['X']);
	console.log('O has: '+globalTicTacVars.getGameStatus()['O']);
	//console.log('Turns played: '+turnsPlayed);

	//var isWon=false;
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
	var AI_DELAY=750;

	//algothim to check game end/tie
	if (globalTicTacVars.getGameStatus()[globalTicTacVars.getCurChar()].length > 2 && turnsPlayed < 10) {
		
		var curCheckArr=globalTicTacVars.getGameStatus()[globalTicTacVars.getCurChar()];
		console.log ('Checking if '+globalTicTacVars.getCurChar()+' won with: '+curCheckArr);
		console.log(winCases);
		
		for (var i in winCases){
			if (globalTicTacVars.getIsWin()){break;}
			var matchCount=0;
			console.log('Now checking' + winCases[i]);
			for (var j in curCheckArr){
				for (var k in winCases[i]){
					if (curCheckArr[j]===winCases[i][k]){
						matchCount++;
						console.log('Matches found: '+ matchCount);
						if (matchCount===3){
							console.log(globalTicTacVars.getCurChar()+' won with: '+ winCases[i]);
							globalTicTacVars.setWinner(winCases[i]);
							$(globalTicTacVars.getStatDiv()).html(globalTicTacVars.getCurChar()+' Won!');
							break;
						}
					}
				}
			}
		}

	}

	if (globalTicTacVars.getIsWin()){
		rewardWin();
	} else {
		if (turnsPlayed===9 && globalTicTacVars.getIsWin()===false){
			$(globalTicTacVars.getStatDiv()).html('Tie!');
		} else {
			globalTicTacVars.toggleCurChar();
			$(globalTicTacVars.getStatDiv()).html('Now Playing: '+globalTicTacVars.getCurChar());
			//assume P1 is always human
			if (globalTicTacVars.numPlayers===1 && globalTicTacVars.getCurChar()===globalTicTacVars.getChar()[1]){
				//need to disable all buttons during this phase
				globalTicTacVars.disableAll();
				console.log('AI Engaged');
				$(globalTicTacVars.getStatDiv()).html('CPU Playing...');
				setTimeout(function(){
					engageAI(globalTicTacVars.getCurChar(),globalTicTacVars.getChar()[0]);
					globalTicTacVars.EnableGaps(); 
				},AI_DELAY);
				//need to enable buttons not played after this phase
				
			}

		}
	}

}




function startGame(gameDiv) {

	var buttonList=globalTicTacVars.setButtons(gameDiv);
	console.log(buttonList);

	globalTicTacVars.setCurChar();
	$(globalTicTacVars.getStatDiv()).html('Now Playing: '+globalTicTacVars.getCurChar());

	for (btnID in buttonList){
		console.log(buttonList[btnID]);
		$('#'+buttonList[btnID]).on("click", function(){
			//visually update game board with chars, disable the board that's already played
			$('#'+this.id).html(globalTicTacVars.getCurChar());
			$("#"+this.id).prop("disabled",true);
			//maintain a list of X and O positions on the game board
			globalTicTacVars.updateGame(globalTicTacVars.getCurChar(),parseInt(this.id.split('_')[1]));
			//check game state
			checkGame();
		});
	}
	$(gameDiv).show();
	$(resetDiv).show();
	$(globalTicTacVars.getStatDiv()).show();

}

var globalTicTacVars = new function(){

	this.globalButtons=[];
	this.gameStatus ={'X':[],'O':[]};
	this.isWon=false;
	this.numPlayers=0;
	this.P1Char='';
	this.P2Char='';
	this.curChar='';
	this.winningArr=[];
	this.DELAY_VAL=1000;
	this.intervalID=0;
	this.statDiv="#statusArea";


	this.resetGlobal = function(){
		this.globalButtons=[];
		this.gameStatus ={'X':[],'O':[]};
		this.isGlobalOn=false;
		this.numPlayers=0;
		this.P1Char='';
		this.P2Char='';
		this.curChar='';
		this.winningArr=[];
		this.isWon=false;

		clearInterval(this.intervalID);
		console.log('stopping intervalID');

	}

	this.disableAll = function () {
		for (var btnTracker in this.globalButtons){

			$('#'+this.globalButtons[btnTracker]).prop("disabled",true);
		}
	}

	//assumes P1 is always human
	//has redundant code, consider refactoring
	this.EnableGaps = function () {
		var AIstat=globalTicTacVars.getGameStatus()[this.getChar()[1]];
		var playerStat=globalTicTacVars.getGameStatus()[this.getChar()[0]];
		var gaps=[];
		var allPos=[0,1,2,3,4,5,6,7,8];
		for (var m in allPos){
			if (AIstat.includes(allPos[m])===false && playerStat.includes(allPos[m])==false){
				//gaps.push(allPos[m]);
				console.log(allPos[m] + ' is a gap');
				$('#btn_'+allPos[m]).prop("disabled",false);
			} else {
				$('#btn_'+allPos[m]).prop("disabled",true);
			}
		}
	}

	this.getStatDiv = function() {
		return this.statDiv;
	}

	this.setIntervalID=function(intervalID){
		this.intervalID=intervalID;
	}

	this.setWinner=function (winArr){
		this.winningArr=winArr.slice();
		this.isWon=true;
	}
	this.getWinner=function (){
		return this.winningArr.slice();
	}
	this.getIsWin = function () {
		return this.isWon;
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
	$(globalTicTacVars.getStatDiv()).hide();

	//disable 1 player game for now
	//$(p1Button).prop("disabled",true);


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
		$(globalTicTacVars.getStatDiv()).html('');
		$(pSelectDiv).show();
	});	
});