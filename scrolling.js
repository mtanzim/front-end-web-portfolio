$(document).ready(function(){
	
	var $ANIMATTION_SPEED = 700;
	var $FADE_ANIMATTION_SPEED = 150;
	
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
	
	adaptNav();
	
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

	
});
	