$(document).ready(function(){
	
	var tempUnit = ["C", "F"];
	var isCel = 0;
	
	function toggleUnit (divInfo) {
		if (isCel===0) {
			$(divInfo).html(tempUnit[isCel]);
			isCel=1;
		} else {
			$(divInfo).html(tempUnit[isCel]);
			isCel=0;
		}
	};


	function getWeather () {
		$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
	  		$("#weatherInfo").html(JSON.stringify(json));
		});
	};

	/*
	function getWeather () {
		$.ajax({
		  url: "api.openweathermap.org/data/2.5/weather?q=London,uk&callback=test",
		  jsonp: "callback",
		  type: "GET",
		  dataType: "jsonp",
		  success: function (data) {
			//$quote = data["value"]["joke"];
			//$("#quote").html($quote);
			//$("#author").html("-" + $author);
			$temp = data[]["temp"];
			$("#weatherInfo").html($temp);


		  },
		  xhrFields: {
			withCredentials: false
		  }
		});
	};
	*/
	
	//getWeather();

	toggleUnit("#togBtn");
	getWeather();
	
	$("#togBtn").on("click", function(){
		toggleUnit ((this));
    });
	
	
});
	
	