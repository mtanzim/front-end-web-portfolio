





function getPosition (position) {
	var lat = position.coords.latitude;
	var longt = position.coords.longitude;
	var coordLoc = [];
	coordLoc.push(lat);
	coordLoc.push(longt);
	getWeather(coordLoc);
}





function getWeather (location) {

	var owmAPI ="b0c19d689944d2473d76de9f1cc4339f";



	$.getJSON("https://api.openweathermap.org/data/2.5/weather?lat="+location[0]+"&lon="+location[1]+"&APPID="+owmAPI+"&units="+globalWeatherVars.tempUnit[globalWeatherVars.isCel], function(json) {
  		var html = '';
  		//html += lat+","+longt+"<br>";
  		//html+=JSON.stringify(json)+"<br><br>";
  		html+='<h2>'+json["name"]+'</h2>';
  		html+='<h3>'+json["weather"][0]["main"]+"</h3>";
  		//html+=json["weather"][0]["icon"]+"<br>";
  		var imageLink="http://openweathermap.org/img/w/"+json["weather"][0]["icon"]+".png";
  		//html += "<img src = '" + imageLink + "alt=weather icon>";
  		//design alternate icons using skycons
  		//html += "<canvas id=\"weatherSkycon\" width=\"128\" height=\"128\"></canvas>";
  		html += "<img id=\'weatherIcon\' src=\'"+ imageLink+"\'><br>";
  		//html += '<i class="'+faConverter[json["weather"][0]["main"]]+' aria-hidden="true"></i><br>'
  		html+='<h3>'+parseInt(json["main"]["temp"])+" &deg"+globalWeatherVars.tempUnit[globalWeatherVars.isCel+2]+"</h3>";
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


var globalWeatherVars = new function() {
	this.isCel=0;
	this.tempUnit = ["metric", "imperial","C","F"];
 	this.toggleUnit=function(divInfo) {
		if (this.isCel===0) {
			this.isCel=1;
		} else {
			this.isCel=0;
		}
	}
}

$(document).ready(function(){

	/* this isn't working :(
	var skycons = new Skycons({"color": "red"});
	skycons.add(document.getElementById("weatherSkycon"), Skycons.RAIN);
	skycons.play();
	console.log(skycons);
	*/

	$('#footer').load('../../common/footerBS3.html #footerCommon', function(){
		console.log('loaded footer');
	});		
	initWeather();
	$("#togBtn").on("click", function(){
		globalWeatherVars.toggleUnit ((this));
		$("#togBtn").toggleClass("leftCol");
		$("#togBtn").toggleClass("rightCol");
		initWeather();
  });
	
});
	
	