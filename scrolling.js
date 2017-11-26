$(document).ready(function(){
	
	var $ANIMATTION_SPEED = 700;
	var $FADE_ANIMATTION_SPEED = 150;

	function loadProjects (startProjID,endProjID) {

		var projects = ["https://mtanzim.github.io/reactProjects/LyndaBulletin/",
							"https://mtanzim.github.io/reactProjects/recipeStore/",
							"https://mtanzim.github.io/webPortfolio/calculator/",
							"https://mtanzim.github.io/webPortfolio/pomodoro/",
							"https://mtanzim.github.io/webPortfolio/simon/",
							"https://mtanzim.github.io/webPortfolio/tictactoe/",
							"https://mtanzim.github.io/webPortfolio/localWeather/",
							"https://mtanzim.github.io/webPortfolio/quoteGen/",
							"https://mtanzim.github.io/webPortfolio/twitchStatus/",
							"https://mtanzim.github.io/webPortfolio/wikiView/",
							"https://mtanzim.github.io/webPortfolio/FrankOcean/"
							];
			var projectsNames = ["Bulletin Board", 
														"Recipe Holder", 
							 							"Calculator",
														"Pomodoro",
														"Simon",
														"Tic Tac Toe",
														"Weather Conditions",
														"Quote Generator",
														"Twitch Status",
														"Wikipedia Search",
														"Frank Ocean"
													];
			//var numProj=projectsNames.length;
			var numProj=endProjID-startProjID+1;
			var colType='col-md-offset-2 col-md-8 col-sm-offset-1 col-sm-10 col-xs-12 col-lg-offset-4 col-lg-4';

			var isLoadDefault=true;

			var setContains=2;
			var numSets=Math.floor(numProj/setContains);


			//clear projects first
			$("#portdivChild").html('');
			$(".projSeeker").removeClass('active');
			$("#projListItem_"+startProjID).addClass('active');

			//disable buttons depending on position
			//$("#prevProj").removeClass('disabled');
			//$("#nextProj").removeClass('disabled');

			$("#prevProj").attr("disabled", false);
			$("#nextProj").attr("disabled", false);

			if (startProjID===0){
				//$("#prevProj").addClass('disabled');
				$("#prevProj").attr("disabled", true);
			}

			if (endProjID===projects.length-1){
				//$("#nextProj").addClass('disabled');
				$("#nextProj").attr("disabled", true);
			}

			if (numProj%setContains!==0) {
				numSets++;
			}

			console.log('number of sets is: '+numSets);

			for (var i=startProjID; i<endProjID+1; i++){
				//colType='col-md-8'
				/* for supporting multiple columns per panel
				if ((i-startProjID)%2===0){
					
					if (i===numProj) {
						colType='col-md-6 col-md-offset-3';	
					} else {
						colType='col-md-5 col-md-offset-1';
					}
				} else {
					colType='col-md-5';
				}
				*/


				$("#portdivChild").append('<div id="divDynamicPortfolio" class="'+colType+'">'+
				'<div id="projThumb" class="thumbnail">'+
					'<iframe id="iframeProj'+i+'" class="projEmbed" src=""></iframe>'+
			    	'<div class="caption text-right">'+
				     		'<h3 id="projTitle'+i+'" class="">'+projectsNames[i]+'</h3>'+
				    		'<a id="aProj'+i+'" class="" href="'+projects[i]+'" target="_blank">'+
				    		'<button class="btn btn-default">Explore</button></a>'+
				    		'<!---<button id="loadProj_'+i+'" class="btn btn-default loadProj">Load Here</button>-->'+	
			    		'</div>'+
						'</div>'+
					'</div>');

					if (isLoadDefault===true){
						//load projects by default
						$("#iframeProj"+i).attr("src",projects[i]);
						$("#loadProj_"+i).html("Reload");
					}
			}



			


			//load projects on demand
			//if (isLoadDefault===false){
				$(".loadProj").on("click", function(){
					var projId=this.id.split('_')[1];
					$("#iframeProj"+projId).attr("src",projects[projId]);
					console.log ("clicked "+ this.id);
					console.log ("loading "+ projects[projId]);
				});
			//}
		
	}
	
	function scrollBody (div_name){
		event.preventDefault();
		$("html, body").animate({
			scrollTop: $(div_name).offset().top
		}, $ANIMATTION_SPEED);
	}
	
	function adaptNav () {
		var viewportWidth = $(window).width();
		$('.projControl').height($('.projEmbed').height());

		
		if (viewportWidth <= 992) {
			$('.projControl').height('50px');
		} else {
			$('.projControl').height($('.projEmbed').height());
		}

		if (viewportWidth < 768) {
				$("#topbar").removeClass("navbar-fixed-top").addClass("navbar-static-top");
				$("#navbarMokaB").addClass('needed');
				$("#navbarMokaB").removeClass('hidden');
				
				//$('#prevProj').html ('Previous');
				//$('#nextProj').html ('Next');
		}		
		else {
			$("#topbar").addClass("navbar-fixed-top").removeClass("navbar-static-top");
			$("#navbarMokaB").removeClass('needed');
			$("#navbarMokaB").addClass('hidden');
			//$('#prevProj').html ('<');
			//$('#nextProj').html ('>');
		}
	}

	//MAIN FUNCTION
	//make this smarter
	const NUM_PROJECTS=9;

	var startProj=0;
	var endProj=startProj+1;
	loadProjects(startProj,startProj);
	adaptNav();

	for (var k=0; k<NUM_PROJECTS; k++){
		$('#projIndicator').append('<li id="projListItem_'+k+'" class="projSeeker"><a>'+parseInt(k+1)+'</a></li>');
	}
	$("#projListItem_"+startProj).addClass('active');
	
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

  $("#nextProj").click(function(){
		startProj++;
		endProj++;
		loadProjects(startProj,startProj);
  });

  $("#prevProj").click(function(){
		startProj--;
		endProj--;
		loadProjects(startProj,startProj);
  });

  $(".projSeeker").click(function(){
  	startProj=parseInt(this.id.split('_')[1]);
  	//alert(startProj);
  	endProj=startProj+1;
  	loadProjects(startProj,startProj);
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
	