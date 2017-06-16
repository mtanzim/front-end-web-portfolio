//wikipediaViewer


function searchWikiAJAX () {
	$("#debug").html("Now searching");
	$.ajax( {
		url: "https://en.wikipedia.org/w/api.php",
		type: "POST",
		data: queryData,
		dataType: "json",
		headers: { 'Api-User-Agent': 'mtanzim@gmail.com' },
		success: function(data) {
			$("#debug").html(JSON.stringify(data));
			//$("#debug").html("came here");
			/*example code
			$quote = data[0]["content"];
			$author = data[0]["title"];
			$quote = jQuery($quote).text();

			$("#quote").html($quote);
			$("#author").html("-" + $author);
			*/
		},
		cache: false
	});
}


function searchWikiJSON () {
	//$("#debug").html("Now searching");
	$.getJSON("http://quotesondesign.com/wp-json/posts?filter[orderby]=rand&filter[posts_per_page]=1", function(json) {
		//$("#debug").html("Now searching");
		var html='';
		html+=JSON.stringify(json);
		$("#debug").html(html);
	});
}




$(document).ready(function(){
	$("#wikSearch").on("click", function(){
		$("#debug").html("Searching...");
		searchWikiJSON();
		//$("#debug").html("Searched");
    });
	
});