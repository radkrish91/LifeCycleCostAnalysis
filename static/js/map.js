var WINDOW_WIDTH = $(window).width(); //browser width
      var WINDOW_HEIGHT = $(window).height(); //brow-fluidser height
      var MAP_WIDTH = 0; //width of visible map (map not covered by panels)
      var map; //main map
      var MAP_CENTER = new google.maps.LatLng(40.0,-74.65); //position that the main map centers on
      var CURRENT_CENTER = MAP_CENTER; //current position of the main map
      //The boundaries of New Jersey, used to prevent user from panning outside the state
      var JERSEY_BOUNDS = new google.maps.LatLngBounds(
        new google.maps.LatLng(38.796908,-75.675476), 
        new google.maps.LatLng(41.418015,-73.643005)
      );
	  var MINIMUM_ZOOM = 9; //The minimum zoom level a user can zoom out
	  
    
var mapOptions = {
			  center: MAP_CENTER,
			  zoom: MINIMUM_ZOOM,
			  mapTypeId: google.maps.MapTypeId.ROADMAP,
			  disableDefaultUI:true,
			  mapTypeControl: true,
			  mapTypeControlOptions: {
				  style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
				  position: google.maps.ControlPosition.TOP_CENTER
			  },
			  streetViewControl: false,
			  streetViewControlOptions: {
				  position: google.maps.ControlPosition.TOP_CENTER
			  }
			};
			
map = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
