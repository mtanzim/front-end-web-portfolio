$(document).ready(function(){
	
	var $ANIMATTION_SPEED = 700;
	var $FADE_ANIMATTION_SPEED = 150;

	function loadProjects () {

		var projects = ["https://mtanzim.github.io/webPortfolio/pomodoro/",
							"https://mtanzim.github.io/webPortfolio/simon/",
							"https://mtanzim.github.io/webPortfolio/tictactoe/",
							"https://mtanzim.github.io/webPortfolio/calculator/",
							"https://mtanzim.github.io/webPortfolio/localWeather/",
							"https://mtanzim.github.io/webPortfolio/quoteGen/",
							"https://mtanzim.github.io/webPortfolio/twitchStatus/",
							"https://mtanzim.github.io/webPortfolio/wikiView/",
							"https://mtanzim.github.io/webPortfolio/FrankOcean/"
							];
			var projectsNames = ["Pomodoro",
														"Simon",
														"Tic Tac Toe",
														"Calculator",
														"Weather Conditions",
														"Quote Generator",
														"Twitch Status",
														"Wikipedia Search",
														"Frank Ocean"
													];
			var numProj=projectsNames.length;
			var colType='col-md-5 col-md-offset-1';

			var setContains=2;
			var numSets=Math.floor(numProj/setContains);

			if (numProj%setContains!==0) {
				numSets++;
			}

			console.log('number of sets is: '+numSets);


			for (var i=0; i<numProj; i++){
				if (i%2===0){
					
					if (i===numProj-1) {
						colType='col-md-6 col-md-offset-3';	
					} else {
						colType='col-md-5 col-md-offset-1';
					}
				} else {
					colType='col-md-5';
				}


				$("#portdivChild").append('<div class="'+colType+'">'+
				'<div id="" class="thumbnail">'+
					'<iframe id="iframeProj'+i+'" class="projEmbed" src=""></iframe>'+
			    	'<div class="caption text-right">'+
				     		'<h3 id="projTitle'+i+'" class="">'+projectsNames[i]+'</h3>'+
				    		'<a id="aProj'+i+'" class="" href="'+projects[i]+'" target="_blank">'+
				    		'<button class="btn btn-default">Explore</button></a>'+
				    		'<button id="loadProj_'+i+'" class="btn btn-default loadProj">Load Here</button>'+	
			    		'</div>'+
						'</div>'+
					'</div>');
			}


		$(".loadProj").on("click", function(){
			var projId=this.id.split('_')[1];
			$("#iframeProj"+projId).attr("src",projects[projId]);
			console.log ("clicked "+ this.id);
			console.log ("loading "+ projects[projId]);
		});
		
	}
	
	function scrollBody (div_name){
		event.preventDefault();
		$("html, body").animate({
			scrollTop: $(div_name).offset().top
		}, $ANIMATTION_SPEED);
	}
	
	function adaptNav () {
		var viewportWidth = $(window).width();
		if (viewportWidth < 768) {
				$("#topbar").removeClass("navbar-fixed-top").addClass("navbar-static-top");
				$("#navbarMokaB").addClass('needed');
				$("#navbarMokaB").removeClass('hidden');
				
		}		
		else {
			$("#topbar").addClass("navbar-fixed-top").removeClass("navbar-static-top");
			$("#navbarMokaB").removeClass('needed');
			$("#navbarMokaB").addClass('hidden');
			
		}
	}

	//MAIN FUNCTION
	
	adaptNav();
	loadProjects();
	
	$('body').scrollspy({target: '.navbar-fixed-top'});
	/*scrollBody ("#body");*/
	
	$("#abtbtn").click(function(){
		scrollBody ("#aboutdiv");
	});
    $("#portbtn").click(function(){
		
		scrollBody ("#portdiv");
    });
	$("#cbut").click(function(){
		scrollBody ("#contdiv");
    });
	$("#topBTN").click(function(){
		scrollBody ("#body");
    });
	$("#expandBtn").click(function(){
		$("#abtbtn").addClass('active');
    });

	
	$(window).resize(function () {
		adaptNav();
	});
	
	$(window).scroll(function() {
		if ($('#navbarMokaB').hasClass('needed')){
			if($(this).scrollTop() > 0) {
				$("#navbarMokaB").fadeIn($FADE_ANIMATTION_SPEED);
			} else {
				$("#navbarMokaB").fadeOut($FADE_ANIMATTION_SPEED);
			}
		} else {
			$("#navbarMokaB").fadeOut($FADE_ANIMATTION_SPEED);
		}
	
	});



	//loadProjects

	
});
	