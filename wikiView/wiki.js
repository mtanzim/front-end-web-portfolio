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


function searchWikiJSON (searchVal) {
	//$("#debug").html("Now searching");
	$.getJSON("https://en.wikipedia.org/w/api.php?action=opensearch&search="+searchVal+"&limit=10&format=json&callback=?", function(json) {
		//$("#debug").html("Now searching");
		var html='';
		html+=JSON.stringify(json);
		//html += searchVal;
		//html += $("#searchInput").serialize(); 
		$("#debug").html(html);
	});
}




$(document).ready(function(){
	$("#wikSearch").on("click", function(){
		$("#debug").html("Searching...");
		var searchVal = document.getElementById("searchInput").value;
		searchWikiJSON(searchVal);
		//$("#debug").html("Searched");
    });
	
});