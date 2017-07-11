$(document).ready(function(){

	
	var $quote = "";
	var $author = "Anonymous";
	var $tweetLink ="https://twitter.com/intent/tweet?text=";
	var $hashtags = "&hashtags=inspired";
	
	
	function call_api_chuck () {
		$.ajax({
		  url: "http://api.icndb.com/jokes/random",
		  jsonp: "callback",
		  type: "GET",
		  dataType: "jsonp",
		  success: function (data) {
			$quote = data["value"]["joke"];
			$("#quote").html($quote);
			$("#author").html("-" + $author);
		  },
		  xhrFields: {
			withCredentials: false
		  }
		});
	};
	
	function getRandomQuote () {
		$.ajax( {
			url: "http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
			success: function(data) {
				//var post = data.shift(); //get first item in array
				$quote = data[0]["content"];
				$author = data[0]["title"];
				$quote = jQuery($quote).text();
				//$author = jQuery($author).text();
				$("#quote").html($quote);
				$("#author").html("-" + $author);
			},
			cache: false
		});
	};
	

	
	getRandomQuote();
	//call_api_chuck();
	
	$("#newBtn").on("click", function(){
		getRandomQuote ();
		//call_api_chuck();
    });
	
	$("#twtBtn").on("click", function(){
		$(this).attr ('href', $tweetLink+'"'+$quote+'"'+" - "+$author+$hashtags);
    });

});
