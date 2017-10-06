//twitch stream status


//userClass
function userClass (icon, name, status, simple, link) {
	this.userIcon=icon;
	this.userName=name;
	this.userStatus=status;
	this.userStatusSimple=simple;
	this.userLink=link;
}


//traverse json and add required users to an array
function checkUserGetStat (userList, twitchDefautIcon) {

	//traverse hardcoded JSON to emulate twitch
	var userArray=[];

	var tempIcon=twitchDefautIcon;
	var tempUserName='';
	var tempStatus='';
	var tempSimple='';
	var tempLink='';
	//var userFound=false;
	
	for (var key in twitchJSON) {
		if (twitchJSON[key].hasOwnProperty("stream")) {
			if (twitchJSON[key].stream !== null) {
				if (twitchJSON[key].stream.hasOwnProperty("display_name")) {
					//$('#debug').append(twitchJSON[key].stream.display_name+": ");
					tempUserName = twitchJSON[key].stream.display_name;
				}
				if (twitchJSON[key].stream.hasOwnProperty("status")) {
					//$('#debug').append(twitchJSON[key].stream.status+"<br>");
					tempStatus = twitchJSON[key].stream.status;
					tempSimple='online';
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
					//$('#debug').append(twitchJSON[key].display_name+": ");
					tempUserName = twitchJSON[key].display_name;
					//$('#debug').append("Offline <br>");
					tempStatus = "Offline";
					tempSimple='offline';
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
			tempIcon=twitchDefautIcon;
			tempUserName='';
			tempStatus="Does not exist yet!";
			tempSimple='dne';
			tempLink='';
		}


		for (var userKey in userList){
			if (userList[userKey].toLowerCase()==tempUserName.toLowerCase()){
				var tempUser = new userClass(tempIcon,tempUserName, tempStatus, tempSimple, tempLink); 
				userArray.push(tempUser);
				break;
			}
		}
		

		tempIcon=twitchDefautIcon;
		tempUserName='';
		tempStatus="";
		tempSimple='';
		tempLink='';

	}
		

	return userArray;


}

function updateTables (userList, userArray, listReq, twitchDefautIcon ) {


	var isFound=false;

	$('#statusTable').html('');

	for (var l in userList){
		for (var k in userArray){
			if (userArray[k].userName.toLowerCase()==userList[l].toLowerCase()) {
				//$('#debug').append(userArray[k].userStatusSimple);
				if (userArray[k].userStatusSimple == listReq || listReq == 'all') {
					$('#statusTable').append('<tr><td><a target="_blank" href="'+userArray[k].userLink+'""><img width="75" height="auto" src="'+ userArray[k].userIcon +'"</img></a></td><td>'+userArray[k].userName+'</td><td>'+ userArray[k].userStatus +'</td></tr>');
				}
				isFound=true;
				//break;
			}
		}
		//users that don't exist
		if(!isFound && listReq == 'all') {
			$('#statusTable').append('<tr><td><a href="#"'+'""><img width="75" height="auto" src="'+twitchDefautIcon+'"</img></a></td><td>'+userList[l]+'</td><td>'+'User does not exist!' +'</td></tr>');
		}
		isFound=false;
	}


}



//main function
$(document).ready(function(){
	//alert("Hi!");
	var userList=["comster404","ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	var twitchDefautIcon ='https://cdn1.iconfinder.com/data/icons/simple-icons/2048/twitch-2048-black.png'
	var userArray = checkUserGetStat (userList, twitchDefautIcon);
	updateTables (userList, userArray, 'all', twitchDefautIcon);

	$('#footer').load('../../common/footerBS3.html #footerCommon', function(){
		console.log('loaded footer');
	});

	$("#all").on("click", function(){
		updateTables (userList, userArray, 'all', twitchDefautIcon);
    });
    $("#online").on("click", function(){
		updateTables (userList, userArray, 'online', twitchDefautIcon);
    });
    $("#offline").on("click", function(){
		updateTables (userList, userArray, 'offline', twitchDefautIcon);
    });
	//var tableHtml='';
	//$('#debug').append(JSON.stringify(twitchJSON[1]));
	//display the results

	
});