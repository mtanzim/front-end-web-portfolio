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
	

	toggleUnit("#togBtn");
	
	$("#togBtn").on("click", function(){
		toggleUnit ((this));
    });
	
	
});
	
	