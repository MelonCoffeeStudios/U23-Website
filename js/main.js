/// <reference path="../typings/jquery/jquery.d.ts"/>

var scrollPosition = [
          window.scrollY,
          window.scrollX
      ];


function lock(l) {
  if(l == 1){
    console.log("Setting 'html' data: " + scrollPosition)
    html.data('scroll-position', scrollPosition);
    html.data('previous-overflow', html.css('overflow'));
    html.css('overflow', 'hidden');
    console.log("Scrolling to:" + scrollPosition)
    window.scrollTo(scrollPosition[0], scrollPosition[1]);
  } else if (l == 0){
    // un-lock scroll position
    var scrollPosition = html.data('scroll-position');
    html.css('overflow', html.data('previous-overflow'));
    window.scrollTo(scrollPosition[0], scrollPosition[1])
  }
}



var html = jQuery('html');

$(function() {

  scrollPosition = [
          window.scrollY,
          window.scrollX
      ];

  $(".qAWA2").delay(1000).html("");


  $("div img").swipe({
	  swipe:function(event, direction, distance, duration, fingerCount){
	    $(this).text("You swiped " + direction + " for " + distance + "px" )
	  },
	  threshold:100
	});

  $(".swipe-icon").click(function(){
    if ($(".swipe-icon i").hasClass("fa-arrow-circle-o-down")) {
      $(".swipe-icon i").removeClass("fa-arrow-circle-o-down")
      $(".swipe-icon i").addClass("fa-arrow-circle-o-up")
      $('html, body').stop().animate({
        scrollTop: $(".swipe-icon i").offset().top
      }, 400);
    }else{
      $(".swipe-icon i").removeClass("fa-arrow-circle-o-up")
      $(".swipe-icon i").addClass("fa-arrow-circle-o-down")
      $('html, body').stop().animate({
        scrollTop: $("body").offset().top
      }, 400);
    }
  });

  $( "ttr" ).hover(
    function() {
      $( this ).find("desc").addClass("descOverlay")
    }, function() {
      $( this ).find("desc").removeClass("descOverlay")
    }
  );



  $(".sb-click-cont, shadow").click(function(){
    scrollPosition = [
      window.scrollX,
      window.scrollY
    ];

    $("sidebar").stop().toggleClass("sb-out")
    $("shadow").stop().fadeToggle()

  	if($("sidebar").hasClass("sb-out")){
      lock(1)
    } else {
      lock(0)
    }

  });


  /*
  BUTTON CLICK EVENTS
  */
  
  $("button[name=timetable]").click(function(){
      $("page[name=timetable]").addClass("pageDown");
      lock(1)
  })

  $("button[name=map]").click(function(){
      $("page[name=map]").addClass("pageDown");
      lock(1)
  })
  
  $("button[name=ticket-details]").click(function(){
      $("page[name=ticket-details]").addClass("pageDown");
      lock(1)
  })

  $(".backbutton").click(function(){
    $("page").removeClass("pageDown");
    lock(0)
  }) 
  
  var charLimit = 4;
    $(".tick-input").keydown(function(e) {

        var keys = [8, 9, /*16, 17, 18,*/ 19, 20, 27, 33, 34, 35, 36, 37, 38, 39, 40, 45, 46, 144, 145];

        if (e.which == 8 && this.value.length == 0) {
            $(this).prev('.tick-input').focus();
        } else if ($.inArray(e.which, keys) >= 0) {
            return true;
        } else if (this.value.length >= charLimit) {
            $(this).next('.tick-input').focus();
            return false;
        } else if (e.shiftKey || e.which <= 48 || e.which >= 58) {
            return false;
        }
    }).keyup (function () {
        if (this.value.length >= charLimit) {
            $(this).next('.tick-input').focus();
            return false;
        }
    });

});

