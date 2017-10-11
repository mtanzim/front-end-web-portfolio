$(document).ready(function(){

	
	var $quote = "";
	var $author = "Anonymous";
	var $tweetLink ="https://twitter.com/intent/tweet?text=";
	var $hashtags = "&hashtags=inspired";
	
	function toggleTooltip (isLong, msg) {
		$("#twtBtn").tooltip('hide')
	      			.attr('data-original-title', msg)
	      			.tooltip('fixTitle')

		/*if (isLong){$("#twtBtn").tooltip('show');};*/
	}
	
	
	function getRandomQuote () {

		var	count_limit=300;
		var tweetLimit=140;
		console.log($(document).height());
		if ($(document).height()<568){
			count_limit=100;
		}
		

		$.ajax( {
			url: "https://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1",
			success: function(data) {
				//var post = data.shift(); //get first item in array
				$quote = data[0]["content"];
				$author = data[0]["title"];
				$quote = jQuery($quote).text();
				//$author = jQuery($author).text();
				console.log ($quote.length);

				if ($quote.length +$author.length > tweetLimit) {
					$('#twtBtn').prop('disabled',true);
					console.log ($quote.length+ 'is too long for twitter');
					toggleTooltip(true, 'Too long for twitter!');
				} else {
						$('#twtBtn').prop('disabled',false);
						toggleTooltip(true, 'Click to tweet');
				}

				if (($quote.length)>count_limit){
					console.log ($quote.length+ 'is too long');
					getRandomQuote ();
				} else {
					$("#quote").html($quote);
					$("#author").html("-" + $author);
				}
				
			},
			cache: false
		});
	};
	
	$('[data-toggle="tooltip"]').tooltip();
	
	getRandomQuote();
	//call_api_chuck();
	
	$("#newBtn").on("click", function(){
		getRandomQuote ();
		//call_api_chuck();
    });
	
	$("#twtBtn").on("click", function(){
		$(this).attr ('href', $tweetLink+'"'+$quote+'"'+" - "+$author);
    });

});
