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
		var debugHtml='';
		var resultsContent ='';

		debugHtml+=JSON.stringify(json);
		//html += searchVal;
		//html += $("#searchInput").serialize(); 
		//$("#debug").html(html);
		
		var lenOuter = json.length;
		var lenInner=0;
		for (var i=1; i < lenOuter; i++){
			//find max length
			if (json[i].length > lenInner){
				lenInner=json[i].length;
			}
			//lenInner.push(parseInt(json[i].length));
			//for (var j=0; j < lenOuter; j++){
				//resultsContent += '<h1>'+json[j][i]+'</h1>';
			//}
		}
		//resultsContent += '<h1>'+lenInner+'</h1>';

		for (var l=0; l < lenInner; l++){
			resultsContent += '<div class="row">';
			resultsContent += '<div class="col-md-8 col-md-offset-2  well">';
			for (var m=1; m < lenOuter; m++){
				var startTagType = "<p>";
				var endTagType = "</p>";
				if (m==1) {startTagType="<h1>";endTagType="</h1>";}
				else if (m==3) {startTagType='<a href="';endTagType='" target="_blank" class="btn btn-primary">Learn More</a>';}
				resultsContent += startTagType+json[m][l]+endTagType;
			}
			resultsContent += '</div></div>';
		}


		/*
		for (var key in json) {
			if (json.hasOwnProperty(key) && key > 0){
				for (var key2 in json[key]) {
					resultsContent += '<h1>'+json[1][0]+'</h1>';
					resultsContent += '<p>'+json[2][0]+'</p>';
					resultsContent += '<p>'+json[3][0]+'</p>';
				}
				/*
				for (var key2 in val) {
					var val2 = val[key];
					resultsContent += '<p>'+val2+'</p>';
				}
				*//*
				
			}
		}*/


		//$("#debug").html(debugHtml);
		$("#debug").html("<br><br>");
		$("#wikiResults").html(resultsContent);
	});
}




$(document).ready(function(){
	$("#wikSearch").on("click", function(){
		$("#debug").html("Searching...");
		var searchVal = document.getElementById("searchInput").value;
		searchWikiJSON(searchVal);
		//$("#debug").html("Searched");
    });
    $("#searchInput").on("click", function(){
    	if ($(this).val() === "Search") {$(this).val("");}
        
    });
	
});