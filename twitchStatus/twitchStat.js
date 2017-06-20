//twitch stream status


//userClass
function userClass (icon, name, status) {
	this.userIcon=icon;
	this.userName=name;
	this.userStatus=status;
}

//main function
$(document).ready(function(){
	//alert("Hi!");
	var userList=["ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var tableHtml='';
	var userArray=[];


	//$('#debug').append("Starting<br>");

	//var tempUser = new userClass('place', userList[0], "place"); 

	for (var i in userList){
		//$('#debug').append(i + ' ');
		//$('#debug').append(userList[i] + ' ');
		var tempUser = new userClass('icon', userList[i], "status"); 
		//$('#debug').append(tempUser.userName + ' ' + tempUser.userIcon + ' ' + tempUser.userStatus );
		//$('#debug').append("<br>");
		userArray.push(tempUser);
	}

	//$('#debug').append(userArray[4].userName);

	for (var k in userArray){
		
		$('#statusTable').append('<tr><td>'+ userArray[k].userIcon +'</td><td>'+userArray[k].userName+'</td><td>'+ userArray[k].userStatus +'</td></tr>');

	}
	
});