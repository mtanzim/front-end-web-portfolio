//twitch stream status


//userClass
function userClass (icon, name, status, link) {
	this.userIcon=icon;
	this.userName=name;
	this.userStatus=status;
	this.userLink=link;
}




//main function
$(document).ready(function(){
	//alert("Hi!");
	var userList=["comster404","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var tableHtml='';
	var userArray=[];

	var tempIcon='';
	var tempUserName='';
	var tempStatus='';
	var tempLink='';
	

	//traverse hardcoded JSON to emulate twitch
	for (var key in twitchJSON){
		if (twitchJSON[key].hasOwnProperty("stream")) {
			if (twitchJSON[key].stream !== null) {
				if (twitchJSON[key].stream.hasOwnProperty("display_name")) {
					//$('#debug').append(twitchJSON[key].stream.display_name+": ");
					tempUserName = twitchJSON[key].stream.display_name;
				}
				if (twitchJSON[key].stream.hasOwnProperty("status")) {
					//$('#debug').append(twitchJSON[key].stream.status+"<br>");
					tempStatus = twitchJSON[key].stream.status;
				}
				if (twitchJSON[key].stream.hasOwnProperty("url")) {
					//$('#debug').append(twitchJSON[key].stream._links.self+"<br>");
					tempLink = twitchJSON[key].stream.url;
				}
				if (twitchJSON[key].stream.hasOwnProperty("logo")) {
					tempIcon = twitchJSON[key].stream.logo;
				}
			}
			else {
				if (twitchJSON[key].hasOwnProperty("display_name")) {
					if (twitchJSON[key].hasOwnProperty("display_name")) {
						//$('#debug').append(twitchJSON[key].display_name+": ");
						tempUserName = twitchJSON[key].display_name;
					}
					//$('#debug').append("Offline <br>");
					tempStatus = "Offline";
					if (twitchJSON[key].hasOwnProperty("_links")) {
						//$('#debug').append(twitchJSON[key]._links.self+"<br>");
						tempLink = twitchJSON[key]._links.channel;
					}
					if (twitchJSON[key].hasOwnProperty("logo")) {
						tempIcon = twitchJSON[key].logo;
					}
				}
			}
		}
		else {
			tempIcon='';
			tempUserName='user';
			tempStatus="Does not exist yet!";
			tempLink='';
		}

		var tempUser = new userClass(tempIcon,tempUserName, tempStatus, tempLink); 
		userArray.push(tempUser);
		tempIcon='';
		tempUserName='';
		tempStatus="";
		tempLink='';

	}
		

	//traverse array of users we're interested in
	/*
	for (var i in userList){
		//retrieve data about userList

		//$('#debug').append(i + ' ');
		//$('#debug').append(userList[i] + ' ');
		var tempUser = new userClass('icon', userList[i], "status"); 
		//$('#debug').append(tempUser.userName + ' ' + tempUser.userIcon + ' ' + tempUser.userStatus );
		//$('#debug').append("<br>");
		userArray.push(tempUser);
	}
	*/

	//$('#debug').append(JSON.stringify(twitchJSON[1]));
	//display the results
	for (var k in userArray){
		$('#statusTable').append('<tr><td><a target="_blank" href="'+userArray[k].userLink+'""><img width="75" height="auto" src="'+ userArray[k].userIcon +'"</img></a></td><td>'+userArray[k].userName+'</td><td>'+ userArray[k].userStatus +'</td></tr>');
	}
	
});