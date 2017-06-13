

var tempUnit = ["metric", "imperial","C","F"];
var isCel = 0;
var owmAPI ="b0c19d689944d2473d76de9f1cc4339f";



function getPosition (position) {
	var lat = position.coords.latitude;
	var longt = position.coords.longitude;
	var coordLoc = [];
	coordLoc.push(lat);
	coordLoc.push(longt);
	getWeather(coordLoc);
}


function toggleUnit (divInfo) {
	if (isCel===0) {
		isCel=1;
	} else {
		isCel=0;
	}
}


function getWeather (location) {
	$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+location[0]+"&lon="+location[1]+"&APPID="+owmAPI+"&units="+tempUnit[isCel], function(json) {
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
  	
	});
}

function initWeather () {
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition (getPosition);
	} else {
		$("#debugDiv").html("Location not supported on this browser.");
	}
}

$(document).ready(function(){
	initWeather();
	$("#togBtn").on("click", function(){
		toggleUnit ((this));
		initWeather();
    });
	
});
	
	