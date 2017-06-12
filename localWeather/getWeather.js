

var tempUnit = ["metric", "imperial","C","F"];
var isCel = 0;
var lat;
var longt;
var owmAPI ="b0c19d689944d2473d76de9f1cc4339f";
var debugID = document.getElementById("debug");



window.onload = loadLocation();

/*
function loadLocation (){
	//var location=[];
	if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(function(position) {
		  		 lat = position.coords.latitude;
		  		 longt = position.coords.longitude;
			});
	} 
}
*/


function loadLocation () {
	if (navigator.geolocation) {
		//var coord = navigator.geolocation.getCurrentPosition (getPosition);
		navigator.geolocation.getCurrentPosition (getPosition);
	} else {
		debugID.html("Location not supported on this browser.");
	}
	//return coord;
}

function getPosition (position) {
	lat = position.coords.latitude;
	longt = position.coords.longitude;
	/*
	var lat = position.coords.latitude;
	var longt = position.coords.longitude;

	var coordLoc = [];
	coordLoc.push(lat);
	coordLoc.push(longt);
	return coordLoc;
	*/
}

function toggleUnit (divInfo) {
	if (isCel===0) {
		//$(divInfo).html(tempUnit[isCel]);
		isCel=1;
	} else {
		//$(divInfo).html(tempUnit[isCel]);
		isCel=0;
	}
}

function getWeather (location) {
	//var coord = loadLocation();
	//var lat = coord[0];
	//var longt = coord[1];
	loadLocation();
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+longt+"&APPID="+owmAPI+"&units="+tempUnit[isCel], function(json) {
  		var html = '';
  		//html += lat+","+longt+"<br>";
  		//html+=JSON.stringify(json)+"<br><br>";
  		html+=json["name"]+"<br>";
  		html+=json["weather"][0]["main"]+"<br>";
  		//html+=json["weather"][0]["icon"]+"<br>";
  		var imageLink="http://openweathermap.org/img/w/"+json["weather"][0]["icon"]+".png";
  		//html += "<img src = '" + imageLink + "alt=weather icon>";
  		html += "<img id=\'weatherIcon\' src=\'"+ imageLink+"\'><br>";
  		html+=json["main"]["temp"]+" "+tempUnit[isCel+2]+"<br>";
  		$("#weatherInfo").html(html);
  		/*
  		var relevantWeather = {
  			name = json["name"];
  		};
  		*/
	});
}

$(document).ready(function(){

	//loadLocation();
	getWeather();

	//document.getElementById("togBtn").click();

	$("#togBtn").on("click", function(){
		toggleUnit ((this));
		getWeather();
    });
	
	
});
	
	