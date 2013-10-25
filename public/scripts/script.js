// funkcja do automatycznego resizowania, nie wiem czy bedize potrzeba
var viewportWidth;
var viewportHeight;

function resizetoView(){
  viewportWidth = $(window).width();
  viewportHeight = $(window).height();
   $('#profil').height(viewportHeight);
   $('#profil').width(viewportWidth);
}


var name = "";
var pass = "";
var wins = 3;
var looses = 7;
var founded;


function ajaxParser(msg, type) {
  var size = msg[0];
  name = "";

  for (var i = 1; i < size+1; i++) {
    name = name + msg[i];
  }

  console.log(name);
}

function loginPhase(){
 $('#log').show();
 $('#log').addClass('animated fadeInDown');

   // dla buttonu jakis ladna animacja 
  $('#logMe').click(function(){
    
     name = $('[name=login]').val();
     pass = $('[name=pass]').val(); 

         $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'check', name: name, pass: pass},
          success: function(msg){           
          letMeGo(msg);
          }
        });   

  });
}


function letMeGo(feedback) {
  if($("form")[0].checkValidity() || feedback == 'alreadyLogged'){
      if (feedback == 'valid' || feedback == 'notfound' || feedback == 'alreadyLogged') {        
          $('#logMe').addClass('animated bounceOut');
          $("#log").addClass('animated fadeOutDown');
         setTimeout(playPhase, 1500);
       } else if (feedback == 'invalid' ){
          $('#logMe').addClass('animated shake');
          window.alert("check password");
          $('#logMe').removeClass('animated shake');
       } 
      }
      else {        
        window.alert("Please enter nick and pass")
      }   
}

  function winsCount() {
      $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'getwins', name: name},
          success: function(msg){                  
          wins = msg; 
     
          loosesCount();
          }
        });    
  }

    function loosesCount() {
      $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'getlooses', name: name},
          success: function(msg){                  
          looses = msg;
         
          scoreCount();
          }
        });    
  }

  function scoreCount() {
    var sum = parseInt(wins) + parseInt(looses);
    var winsHeight = (wins/sum)*(0.8*viewportHeight);
    var loosesHeight = (0.8*viewportHeight)-winsHeight;
    $('#wins').height(winsHeight);
    $('#looses').height(loosesHeight);
    $('#wins').attr('title','You have won ' + wins + ' times.');
    $('#looses').attr('title','You have lost ' + looses + ' times.'); 
  }

// parse int nie dziala, bo chuj wie jaka tablice zwraca msg. wiec nie mozemy wygenerowac wielkosci paskow



function playPhase() {
  $('#log').hide();
  $('#myName').text("Welcome, " + name);
  winsCount();   
  $('#profil').show();
  $('#scores').show("slide", {direction: "down"}, 2500);
  $('#profil').addClass('animated fadeInDown');
  $('#playMe').click(function() {
    $(this).addClass('animated rotateOut');
        $("#profil").addClass('animated fadeOutDown');     
       setTimeout(searchPhase, 1500);
  });
  $('#killer').click(function(){
    $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'killMe'}, 
          success: function(msg){                  
          location.reload();         
          }
      });               
  });
}

function searchPhase(){
    $("#profil").hide();    
    $("#search").show();
    $("#search").addClass('animated fadeInDown');
    $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'setWaiting'}, 
          success: function(msg){    
            findPlayer();               
                  
          }
      });     
  }

function findPlayer() {  
  $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'findPlayer'}, 
          success: function(msg){

             if (msg != 'notfound') {
              letsPlay(); 
             } else {
                findPlayer();
             }             
          }
      });     
}

function letsPlay() {
  $("#search").addClass('animated fadeOutDown'); 
  setTimeout(gamePhase, 3000);
}

function gamePhase() {
  init();
  animate();
  $('#search').hide();
  $('#game').show();
  $('#game').addClass('animated fadeInDown');
}

function setBusy() {
  $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'setBusy'}         
  })
}

$(document).ready( function(){
  resizetoView();
  $(window).bind('resize', resizetoView); 

  $.ajax({
          url: 'base.php',
          type: 'POST',
          data: {action: 'checkSession'},
          success: function(msg){
            name = msg;          

            if (name != "notlogged") {
              letMeGo('alreadyLogged');                
            } else {            
              loginPhase();
            }
          }
        });


  

    // tooltips :) via http://osvaldas.info/elegant-css-and-jquery-tooltip-responsive-mobile-friendly

   var targets = $( '[rel~=tooltip]' ),
        target  = false,
        tooltip = false,
        title   = false;
 
    targets.bind( 'mouseenter', function()
    {
        target  = $( this );
        tip     = target.attr( 'title' );
        tooltip = $( '<div id="tooltip"></div>' );
 
        if( !tip || tip == '' )
            return false;
 
        target.removeAttr( 'title' );
        tooltip.css( 'opacity', 0 )
               .html( tip )
               .appendTo( 'body' );
 
        var init_tooltip = function()
        {
            if( $( window ).width() < tooltip.outerWidth() * 1.5 )
                tooltip.css( 'max-width', $( window ).width() / 2 );
            else
                tooltip.css( 'max-width', 340 );
 
            var pos_left = target.offset().left + ( target.outerWidth() / 2 ) - ( tooltip.outerWidth() / 2 ),
                pos_top  = target.offset().top - tooltip.outerHeight() - 20;
 
            if( pos_left < 0 )
            {
                pos_left = target.offset().left + target.outerWidth() / 2 - 20;
                tooltip.addClass( 'left' );
            }
            else
                tooltip.removeClass( 'left' );
 
            if( pos_left + tooltip.outerWidth() > $( window ).width() )
            {
                pos_left = target.offset().left - tooltip.outerWidth() + target.outerWidth() / 2 + 20;
                tooltip.addClass( 'right' );
            }
            else
                tooltip.removeClass( 'right' );
 
            if( pos_top < 0 )
            {
                var pos_top  = target.offset().top + target.outerHeight();
                tooltip.addClass( 'top' );
            }
            else
                tooltip.removeClass( 'top' );
 
            tooltip.css( { left: pos_left, top: pos_top } )
                   .animate( { top: '+=10', opacity: 1 }, 50 );
        };
 
        init_tooltip();
        $( window ).resize( init_tooltip );
 
        var remove_tooltip = function()
        {
            tooltip.animate( { top: '-=10', opacity: 0 }, 50, function()
            {
                $( this ).remove();
            });
 
            target.attr( 'title', tip );
        };
 
        target.bind( 'mouseleave', remove_tooltip );
        tooltip.bind( 'click', remove_tooltip );
    });

});
  