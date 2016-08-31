$(document).ready(function(){
   
    Materialize.updateTextFields();
	
	$('.dropdown-button').dropdown({
      inDuration: 300,
      outDuration: 225,
      constrain_width: false, // Does not change width of dropdown to that of the activator
      hover: true, // Activate on hover
      gutter: 0, // Spacing from edge
      belowOrigin: true, // Displays dropdown below the button
      alignment: 'left' // Displays dropdown with edge aligned to the left of button
    }
  );
  
    $('.tooltipped').tooltip({delay: 50});
	$('select').material_select();
	$("#sri_options").load("./php/getter.php");
	
	$('.numeric_only').keypress(function (e) {
		//if the letter is not digit then display error and don't type anything
		if (e.which != 8 && e.which != 0 && e.which != 46 && (e.which < 48 || e.which > 57)) {
        //display error message
        $("#errmsg").html("<b>NUMERIC ONLY</b>").show().fadeOut("slow");
               return false;
		}
		});
	
	$('.parallax').parallax();	
	$('.button-collapse').sideNav();
	$('.modal-trigger').leanModal();
	$('.slider').slider({full_width: true}); 
	$('.slider').slider({height: 800}); 
	//$('.slider').slider({Interval: 800}); 
	$( "#chart_div, #piechart, #piechart2" ).mouseover(function() {
	  $('.slider').slider('pause');
	});
	
	$( "#chart_div, #piechart, #piechart2" ).mouseout(function() {
	  $('.slider').slider('start');
	});
	
  });
  
