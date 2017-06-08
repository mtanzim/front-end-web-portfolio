$(document).ready(function(){
	
	var tempUnit = ["metric", "imperial","C","F"];
	var isCel = 0;
	var lat=0;
	var longt=0;
	var owmAPI ="b0c19d689944d2473d76de9f1cc4339f";
	
	function toggleUnit (divInfo) {
		if (isCel===0) {
			//$(divInfo).html(tempUnit[isCel]);
			isCel=1;
		} else {
			//$(divInfo).html(tempUnit[isCel]);
			isCel=0;
		}
	};


	function getWeather () {
		$.getJSON("http://api.openweathermap.org/data/2.5/weather?lat="+lat+"&lon="+longt+"&APPID="+owmAPI+"&units="+tempUnit[isCel], function(json) {
	  		var html = '';
	  		//html+=JSON.stringify(json)+"<br><br>";
	  		html+=json["name"]+"<br>";
	  		html+=json["weather"][0]["main"]+"<br>";
	  		html+=json["main"]["temp"]+" "+tempUnit[isCel+2]+"<br>";
	  		$("#weatherInfo").html(html);
	  		/*
	  		var relevantWeather = {
	  			name = json["name"];
	  		};
	  		*/
		});
	};

	if (navigator.geolocation) {
  		navigator.geolocation.getCurrentPosition(function(position) {
	  		lat = position.coords.latitude;
	  		longt = position.coords.longitude;
	    	$("#locData").html("latitude: " + lat + "<br>longitude: " + longt);
  		});
	};

	toggleUnit("#togBtn");
	getWeather();
	
	$("#togBtn").on("click", function(){
		toggleUnit ((this));
		getWeather();
    });
	
	
});
	
	