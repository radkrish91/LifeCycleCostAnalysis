angular.module('lccaApp').factory('sharedProperties', function($rootScope) {
	var stringValue = 'test string value';
	
	var typeOfApproach = {
		type : "Deterministic"
	};
	
    var hypotheticalData = {
		//hypothetical scenario defaults
        analysis: 75,
		typeOfDis: "",
		disc_rateMean: 3,
		disc_rateStd: 0.5,
		disc_rateMin: 5,
		disc_rateMax: 7,
		disc_rateMsl: 6,
		disc_rateFix: 3,
		disc_rate: 3,
		trafficVolume: 114750,
		noLanes: 12,
		length: 231.9,
		width: 154.9,
		truck: 9
    };
	
	var realData = {
		//real scenario defaults
		analysis: 75,
		typeOfDis: "",
		disc_rateMean: 3,
		disc_rateStd: 0.5,
		disc_rateMin: 5,
		disc_rateMax: 7,
		disc_rateMsl: 6,
		disc_rateFix: 3,
		disc_rate: 3,
		trafficVolume: 0,
		noLanes: 0,
		length: 0,
		width: 0,
		truck: 9
	};
	
	var lccaData = {
		//life cycle cost analysis defaults
		typoOfScenario: "hypothetical",
		typeOfDis: "",
		servlifeMean: 30,
		servlifeStd: 30,
		servlifeMin: 29,
		servlifeMax: 31,
		servlifeMsl: 30,
		servlifeFix: 30,
		servlife: 30,
		typeOfDisNew: "",
		servlifeNewMean: 30,
		servlifeNewStd: 30,
		servlifeNewMin: 29,
		servlifeNewMax: 31,
		servlifeNewMsl: 30,
		servlifeNewFix: 39,
		newservlife: 39,
		cmat_val: 91.06,
		nmat_val: 95.3,
		ccon_val: 150,
		ncon_val: 152.78,
		conv_depth: 10,
		new_depth: 10,
		conv_des: 100000,
		new_des: 100000,
		conv_key: "abc",
		new_key: "abc",
		conv_fun: "abc",
		new_fun: "abc",
		conv_ener: "abc",
		conv_enerNew: "abc",
		
		name: "Maintenance",
		years: 5,
		days: 10,
		new_name: "Maintenance",
		new_years: 5,
		new_days: 10,
	
		name1: "Resurfacing",
		years1: 15,
		days1: 20,
		new_name1: "Resurfacing",
		new_years1: 20,
		new_days1: 20,
	
		name2: "Replacement",
		years2: 30,
		days2: 60,
		new_name2: "Replacement",
		new_years2: 39,
		new_days2: 60
	};
    
    return {
        getString: function() {
            return stringValue;
        },
        setString: function(value) {
            stringValue = value;
        },
        getHypotheticalData: function() {
            return hypotheticalData;
        },
		getRealData: function() {
			return realData;
		},
		getlccaData: function() {
			return lccaData;
		},
		gettypeOfApproach: function() {
			return typeOfApproach;
		}
    }
});

angular.module('lccaApp').controller('mainController', ['$scope', '$mdDialog', '$state', 'sharedProperties', function($scope, $mdDialog, $state, sharedProperties) {
        $scope.checkProbOrDetHypo = function(ev) {
			$mdDialog.show({
			  controller: DialogController,
			  templateUrl: 'tabDialog.checkProbOrDet.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			})
			.then(function(answer) {
				  $scope.typeOfApproach = sharedProperties.gettypeOfApproach();
				  $scope.typeOfApproach.type = answer;
				  $state.get('home.hypothetical').data.displayName = "Hypothetical Scenario(" + answer + ")";
				  $state.go("home.hypothetical");
			}, function() {
				  $scope.status = 'You cancelled the dialog.';
			});
	   };
	   
	   
	   $scope.checkProbOrDetReal = function(ev) {
			$mdDialog.show({
			  controller: DialogController,
			  templateUrl: 'tabDialog.checkProbOrDet.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			})
			.then(function(answer) {
				  $scope.typeOfApproach = sharedProperties.gettypeOfApproach();
				  $scope.typeOfApproach.type = answer;
				  console.log($scope.typeOfApproach.type);
				  $state.get('home.real').data.displayName = "Real Infrastructure in NJ(" + answer + ")";
				  $state.go("home.real");
			}, function() {
				  $scope.status = 'You cancelled the dialog.';
			});
	   };
	   
	   function DialogController($scope, $mdDialog) {
		  $scope.hide = function() {
			  $mdDialog.hide();
		  };

			$scope.cancel = function() {
			  $mdDialog.cancel();
			};

			$scope.answer = function(answer) {
			  $mdDialog.hide(answer);
			};
		}
    }]);

//videoController - controller for the VIDEO.HTML page

angular.module('lccaApp').controller('videoController', ['$scope', function($scope, sharedProperties) {
        
    }]);

//hypoController - controller for the HYPOTHETICAL.HTML page

angular.module('lccaApp').controller('hypoController', ['$scope', '$mdDialog', 'sharedProperties', function($scope, $mdDialog, sharedProperties) {
	
		var distribution;
		
		$scope.typeOfApproach = sharedProperties.gettypeOfApproach();
		$scope.hypoData = sharedProperties.getHypotheticalData();
		$scope.lccaData = sharedProperties.getlccaData();
		$scope.typeOfDis = $scope.hypoData.typeOfDis;
		
		$scope.typeOfDistribution = [ {name: "Normal"} , {name: "Triangular"} , {name: "Fixed" } ];
		
		$scope.showTypeOfDistribution = function(ev, typeOfDis) {
			distribution = typeOfDis;
			$mdDialog.show({
			  controller: DialogController,
			  templateUrl: 'tabDialog.disc_rate.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			});
	   };
	   
	   function DialogController($scope, $mdDialog, sharedProperties) {
		  $scope.typeOfDis = distribution;
		  $scope.dialogData = sharedProperties.getHypotheticalData();
		  $scope.hide = function() {
			  $mdDialog.hide();
		  };

			$scope.cancel = function() {
			  $mdDialog.cancel();
			};

			$scope.answer = function(disc_rateHypoProb, disc_rateHypoProbMean , disc_rateHypoProbStd , disc_rateHypoProbMin , disc_rateHypoProbMsl, disc_rateHypoProbMax) {
		      if(distribution == "Normal") {
					$scope.dialogData.disc_rateMean = $scope.dialogData.disc_rateMean;
					$scope.dialogData.disc_rateStd = $scope.dialogData.disc_rateStd;
				}
				if(distribution == "Fixed") {
					$scope.dialogData.disc_rateFix = $scope.dialogData.disc_rateFix;
				}
				if(distribution == "Triangular") {
					$scope.dialogData.disc_rateMin = $scope.dialogData.disc_rateMin;
					$scope.dialogData.disc_rateMax = $scope.dialogData.disc_rateMax;
					$scope.dialogData.disc_rateMsl = $scope.dialogData.disc_rateMsl;
				}
			  $mdDialog.hide(disc_rateHypoProb, disc_rateHypoProbMean , disc_rateHypoProbStd , disc_rateHypoProbMin , disc_rateHypoProbMsl, disc_rateHypoProbMax);
			};
		}
	
		//default values for hypothetical scenario
		
		$scope.setHypotheticalData = function(analysis,disc_rate,trafficVolume,noLanes,length,width,truck) {
			$scope.hypoData.analysis = analysis;
			$scope.hypoData.trafficVolume = trafficVolume;
			$scope.hypoData.noLanes = noLanes;
			$scope.hypoData.length = length;
			$scope.hypoData.width = width;
			$scope.hypoData.truck = truck;
			$scope.lccaData.typoOfScenario = "hypothetical"
			
			if($scope.typeOfApproach.type == "Deterministic") {
				$scope.hypoData.disc_rate = disc_rate;
			} 
			if($scope.typeOfApproach.type == "Probabilistic") {
				$scope.hypoData.typeOfDis = distribution;
			}
		};
		
    }]);

//realController - controller for the REAL.HTML page - refer to the REAL.HTML page for further information (See website - Projection Information -> Real Infrastructure in NJ)
	
angular.module('lccaApp').controller('realController', ['$scope', '$http', '$mdDialog', 'sharedProperties' , function($scope, $http, $mdDialog, sharedProperties) {
		
		var distribution;
		
		$scope.typeOfApproach = sharedProperties.gettypeOfApproach();
		$scope.typeOfDis = $scope.realData.typeOfDis;
		$scope.realData = sharedProperties.getRealData();
		$scope.lccaData = sharedProperties.getlccaData();
		
		
		$scope.typeOfDistribution = [ {name: "Normal"} , {name: "Triangular"} , {name: "Fixed" } ];
		
		$scope.showTypeOfDistribution = function(ev, typeOfDis) {
			distribution = typeOfDis;
			$mdDialog.show({
			  controller: DialogController,
			  templateUrl: 'tabDialog.disc_rate.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			});
	   };
	   
	   function DialogController($scope, $mdDialog, sharedProperties) {
		  $scope.typeOfDis = distribution;
		  $scope.dialogData = sharedProperties.getRealData();
		  $scope.hide = function() {
			  $mdDialog.hide();
		  };

			$scope.cancel = function() {
			  $mdDialog.cancel();
			};

			$scope.answer = function() {
		      if(distribution == "Normal") {
					//console.log(disc_rateHypoProbStd);
					$scope.dialogData.disc_rateMean = $scope.dialogData.disc_rateMean;
					$scope.dialogData.disc_rateStd = $scope.dialogData.disc_rateStd;
				}
				if(distribution == "Fixed") {
					$scope.dialogData.disc_rateFix = $scope.dialogData.disc_rateFix;
				}
				if(distribution == "Triangular") {
					$scope.dialogData.disc_rateMin = $scope.dialogData.disc_rateMin;
					$scope.dialogData.disc_rateMax = $scope.dialogData.disc_rateMax;
					$scope.dialogData.disc_rateMsl = $scope.dialogData.disc_rateMsl;
				}
			  $mdDialog.hide();
			};
		}
		
		$scope.setRealData = function(analysis,disc_rate,truck) {
			$scope.realData.analysis = analysis;
			$scope.realData.truck = truck;
			$scope.lccaData.typoOfScenario = "real";
			
			if($scope.typeOfApproach.type == "Deterministic") {
				$scope.realData.disc_rate = disc_rate;
			} 
			if($scope.typeOfApproach.type == "Probabilistic") {
				$scope.realData.typeOfDis = distribution;
			}
		};
		
		var lanes = 0;
		var aadt = 0;
		var latitude = 0;
		var longitude = 0;
		 
		//map initialization - code from google maps developer page.
		var links = new google.maps.Data();
		var JERSEY_BOUNDS = new google.maps.LatLngBounds(
			new google.maps.LatLng(38.796908,-75.675476), 
			new google.maps.LatLng(41.418015,-73.643005)
		);
		var MAP_CENTER = new google.maps.LatLng(40.0,-74.65); //position that the main map centers on
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
		$scope.map_canvas = new google.maps.Map(document.getElementById('map_canvas'), mapOptions);
		
		$scope.availableOptions= [];
				
		//http call to getter.php api for getting the SRI links from database.
		$http({
		  method: 'GET',
		  url: '/sriGetter'
		})
		.success(function(data) { //data received in "~" separated values in the form of ["Column chart values"~"Pie chart values for Conventional material"~"Pie chart values for New material"~"Life Cycle Cost of conventional material"~"Life Cycle Cost of New material"]
			//console.log(data.items);
			$scope.availableOptions = data.items;
			$scope.selectedOption = {id: '1', name: 'Choose SRI'};
 	    })
		.error(function(data) {
            console.log("error");
            console.log(data);
        });
		
		
		//when user selects a SRI from the dropdown
		 $scope.hasChanged = function() {
			 var sriData = {"sri" : $scope.selectedSRI};
			 map_damage = new google.maps.Map(document.getElementById("map_canvas"), mapOptions);
			 document.getElementById("map_canvas").style.display = "inline-block";
			 links.setMap(null);
			 links =  new google.maps.Data({map:map_damage});
			 $http.post("/getMilePost", sriData)
			 .success(function(data) {
				 //console.log(data.StartMilePost);
				 //console.log(data.EndMilePost);
				$scope.realData.sld_mp_st = data.StartMilePost;
				$scope.realData.sld_mp_end = data.EndMilePost;
			 })
			 .error(function(data) {
				console.log("error");
				console.log(data);
			 });
			//console.log($scope.choose.type);
			if($scope.choose.type == "bridge") {
			
				$http.post("/getBridges", sriData)
				.success(function(data) {
					console.log(data);
					var latitudes = JSON.parse(JSON.stringify(data.latitude));
					var longitudes = JSON.parse(JSON.stringify(data.longitude));
					var features = JSON.parse(JSON.stringify(data.features));
					var locations = JSON.parse(JSON.stringify(data.locations));
					var yearBuilt = JSON.parse(JSON.stringify(data.year_built));
					var length = JSON.parse(JSON.stringify(data.length));
					var width = JSON.parse(JSON.stringify(data.width));
					console.log(latitudes);
					for(i=0; i<latitudes.length; i++) {
						var position = new google.maps.LatLng(latitudes[i], longitudes[i]);
						JERSEY_BOUNDS.extend(position);
						var image = new google.maps.MarkerImage(
							'/static/img/bridge.png',
							null,
							null,
							null,
							new google.maps.Size(31, 48));
						
						marker = new google.maps.Marker({
							position: position,
							map: map_damage,
							title: "Bridge"
						});
						marker.setIcon(image);
						var contentString = '<div id = "content">' +
						'<div id="siteNotice">'+
						  '</div>'+
						  '<h4 id="firstHeading" class="firstHeading">' + features[i] + '</h4>'+
						  '<div id="bodyContent">'+
						  '<p><b>Location : </b>' + locations[i] + '</p>'+
						  '<p><b>Year Built: </b>' + yearBuilt[i] + '</p>'+
						  '</div>'+
						  '</div>';

						var infowindow =  new google.maps.InfoWindow({
							content: ''
						});
						bindInfoWindow(marker, map_damage, infowindow, contentString, length[i], width[i]);
					}
					function bindInfoWindow(marker, map, infowindow, html, length, width) { 
						google.maps.event.addListener(marker, 'mouseover', function() { 
							infowindow.setContent(html); 
							infowindow.open(map, marker); 
						});
						google.maps.event.addListener(marker, 'mouseout', function() { 
							infowindow.close(); 
						});
						google.maps.event.addListener(marker, 'click' , function() {
							ajaxCall(document.getElementById('sld_mp_st').value, document.getElementById('sld_mp_end').value);
							document.getElementById("infoTable").style.display = "inline-block";
							document.getElementById("length").value = length;
							document.getElementById("width").value = width;
							counter++;
							var row = $("<tr><td>" + counter + "</td><td>" + lanes + "</td><td>" + length + "</td><td>" + width + "</td><td>" + aadt + "</td></tr>");
							$("#infoTable > tbody").append(row);
						});
					}
					
					function processPoints(geometry, callback, thisArg) {
					if (geometry instanceof google.maps.LatLng) {
						callback.call(thisArg, geometry);
					} else if (geometry instanceof google.maps.Data.Point) {
						callback.call(thisArg, geometry.get());
					} else {
						geometry.getArray().forEach(function (g) {
							processPoints(g, callback, thisArg);
						});
					}
					}
						
				})
				.error(function(data) {
						alert('Something has gone wrong while fetching data from DB');
				});
			}
			
			if($scope.choose.type == "pavement") {
				$http.post("/mapfiller", sriData)
				.success(function(data) {
					//console.log(data.geojsonstring);
					links.loadGeoJson('/static/js/maps.json');
					console.log("hello");
					var featureStyle = {
						fillColor: '#600080',
						fillOpacity: 0.1,
						strokeColor: '#600080',
						strokeWeight:4
					};
					
					links.setStyle(function(feature) {
						var color = '#cc33ff';
						if (feature.getProperty('isColorful')) {
						  color = feature.getProperty('color');
						}
						return /** @type {google.maps.Data.StyleOptions} */({
						  fillColor: color,
						  strokeColor: color,
						  strokeWeight: 4
						});
					});
					
					var highwayData;
					var startMP;
					var endMP;
					var highwayName;
					var highwayID;
					var contentString;
					var infowindow =  new google.maps.InfoWindow({
										content: ''
									});
									
					links.addListener('mouseover', function(event) {
						startMP = event.feature.getProperty('start_milepost');
						endMP = event.feature.getProperty('end_milepost');
						//alert(startMP);
						//alert(endMP);
						links.revertStyle();
						links.overrideStyle(event.feature, {fillColor: '#600080', strokeColor: '#600080', strokeWeight: 8});
						ajaxCall(startMP, endMP);
						contentString = '<div id = "content">' +
							'<div id="siteNotice">'+
							  '</div>'+
							  '<h4 id="firstHeading" class="firstHeading">' + highwayName + '</h4>'+
							  '<div id="bodyContent">'+
							  '<p><b>Highway ID : </b>' + highwayID + '</p>'+
							  '</div>'+
							  '</div>';
						
						infowindow.setContent(contentString); 
						infowindow.open(map_damage);
					});
					
					//function bindEventsHighway(lanes, aadt) {

					links.addListener('click', function(event) {
						startMP = event.feature.getProperty('start_milepost');
						endMP = event.feature.getProperty('end_milepost');
						document.getElementById("infoTable").style.display = "inline-block";
						event.feature.setProperty('isColorful', true);
						ajaxCall(startMP, endMP);
						document.getElementById("noLanes").value = lanes;
						document.getElementById("trafficVolume").value = aadt;
						counter++;
						var row = $("<tr><td>" + counter + "</td><td>" + lanes + "</td><td>" + "__" + "</td><td>" + "__" + "</td><td>" + aadt + "</td></tr>");
						$("#infoTable > tbody").append(row);
					});
								
					links.addListener('mouseout', function(event) {
						links.revertStyle();
						infowindow.close(); 
					});
					
					function ajaxCall(startMP, endMP) {
						console.log(startMP);
						var data = {"sri" : $scope.selectedSRI, "startMP" : startMP, "endMP" : endMP};
						$http.post("/getHighway", data)
						.success(function(data) {
							//console.log(data.items.LANES);
							lanes = data.lanes;
							aadt = data.aadt;
							highwayName = data.highway_name;
							highwayID = data.highway_id;
							latitude = data.latitude;
							longitude = data.longitude;
						 })
						 .error(function(data) {
							console.log("error");
							console.log(data);
						 });
					}
					
					//console.log("before");
					links.setMap(map_damage);
					//console.log("after");
					// zoom to show all the features
					var bounds = new google.maps.LatLngBounds();
					links.addListener('addfeature', function (e) {
						processPoints(e.feature.getGeometry(), bounds.extend, bounds);
						map_damage.fitBounds(bounds);
					});
					/*map_damage.data.addListener('addfeature', function(event) {
						console.log(event);
					  });*/
				})
				.error(function(data) {
						alert('Something has gone wrong while fetching data from DB');
				});

				function processPoints(geometry, callback, thisArg) {
					if (geometry instanceof google.maps.LatLng) {
						callback.call(thisArg, geometry);
					} else if (geometry instanceof google.maps.Data.Point) {
						callback.call(thisArg, geometry.get());
					} else {
						geometry.getArray().forEach(function (g) {
							processPoints(g, callback, thisArg);
						});
					}
				}

			}
		}; 
		
    }]);

//lccaController - controller for the LCCA.HTML page	- refer to the LCCA.HTML page for further information. (See website - Life Cycle Cost Analysis tab)
	
angular.module('lccaApp').controller('lccaController',  ['$scope', '$http', 'sharedProperties', '$mdDialog', '$mdMedia', function lccaController($scope, $http, sharedProperties, $mdDialog, $mdMedia) {

	//default values for the Life Cycle Cost Analysis page
	var distribution;
	var newDistribution;
	
	$scope.formData = sharedProperties.getlccaData();
	$scope.formData.typeOfApproach = sharedProperties.gettypeOfApproach().type;
	$scope.typeOfDis = $scope.formData.typeOfDis;
	
	var typeOfScenario = $scope.formData.typoOfScenario;
	
	$scope.typeOfDistribution = [ {name: "Normal"} , {name: "Triangular"} , {name: "Fixed" } ];
	
	$scope.showTypeOfDistribution = function(ev, typeOfDis) {
			//console.log(typeOfDis);
			distribution = typeOfDis;
			$mdDialog.show({
			  controller: DialogControllerCon,
			  templateUrl: 'tabDialog.servLife.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			});
	   };
	   
    function DialogControllerCon($scope, $mdDialog, sharedProperties) {
	  $scope.typeOfDisCon = distribution;
	  console.log(distribution);
	  $scope.dialogData = sharedProperties.getlccaData();
	  $scope.hide = function() {
		  $mdDialog.hide();
	  };

		$scope.cancel = function() {
		  $mdDialog.cancel();
		};

		$scope.answer = function() {
		  if(distribution == "Normal") {
				//console.log(disc_rateHypoProbStd);
				$scope.dialogData.servlifeMean = $scope.dialogData.servlifeMean;
				$scope.dialogData.servlifeStd = $scope.dialogData.servlifeeStd;
			}
			if(distribution == "Fixed") {
				$scope.dialogData.servlifeFix = $scope.dialogData.servlifeFix;
			}
			if(distribution == "Triangular") {
				$scope.dialogData.servlifeMin = $scope.dialogData.servlifeMin;
				$scope.dialogData.servlifeMax = $scope.dialogData.servlifeMax;
				$scope.dialogData.servlifeMsl = $scope.dialogData.servlifeMsl;
			}
		  $mdDialog.hide();
		};
	}
	
	$scope.showTypeOfDistributionNew = function(ev, typeOfDis) {
			newDistribution = typeOfDis;
			$mdDialog.show({
			  controller: DialogControllerNew,
			  templateUrl: 'tabDialog.newservLife.html',
			  parent: angular.element(document.body),
			  targetEvent: ev,
			  clickOutsideToClose: false
			});
	   };
	   
    function DialogControllerNew($scope, $mdDialog, sharedProperties) {
	  $scope.typeOfDis = newDistribution;
	  $scope.dialogData = sharedProperties.getlccaData();
	  $scope.hide = function() {
		  $mdDialog.hide();
	  };

		$scope.cancel = function() {
		  $mdDialog.cancel();
		};

		$scope.answer = function() {
		  if(distribution == "Normal") {
				//console.log(disc_rateHypoProbStd);
				$scope.dialogData.servlifeNewMean = $scope.dialogData.servlifeNewMean;
				$scope.dialogData.servlifeNewStd = $scope.dialogData.servlifeNewStd;
			}
			if(distribution == "Fixed") {
				$scope.dialogData.servlifeNewFix = $scope.dialogData.servlifeNewFix;
			}
			if(distribution == "Triangular") {
				$scope.dialogData.servlifeNewMin = $scope.dialogData.servlifeNewMin;
				$scope.dialogData.servlifeNewMax = $scope.dialogData.servlifeNewMax;
				$scope.dialogData.servlifeNewMsl = $scope.dialogData.servlifeNewMsl;
			}
		  $mdDialog.hide();
		};
	}
	
	$scope.setLcca = function(servlife, newservlife, cmat_val, nmat_val, ccon_val, ncon_val, conv_depth, new_depth, conv_des, new_des, conv_key, new_key, conv_fun, new_fun, conv_ener, conv_enerNew, name, years, days, new_name, new_years, new_days, name1, years1, days1, new_name1, new_years1, new_days1, name2, years2, days2, new_name2, new_years2, new_days2) {
		
		$scope.formData.cmat_val = cmat_val;
		$scope.formData.nmat_val= nmat_val;
		$scope.formData.ccon_val= ccon_val;
		$scope.formData.ncon_val= ncon_val;
		$scope.formData.conv_depth= conv_depth;
		$scope.formData.new_depth= new_depth;
		$scope.formData.conv_des= conv_des;
		$scope.formData.new_des= new_des;
		$scope.formData.conv_key= conv_key;
		$scope.formData.new_key= new_key;
		$scope.formData.conv_fun= conv_fun;
		$scope.formData.new_fun= new_fun;
		$scope.formData.conv_ener= conv_ener;
		$scope.formData.conv_enerNew= conv_enerNew;
		
		$scope.formData.name= name;
		$scope.formData.years= years;
		$scope.formData.days= days;
		$scope.formData.new_name= new_name;
		$scope.formData.new_years= new_years;
		$scope.formData.new_days= new_days;
	
		$scope.formData.name1= name1;
		$scope.formData.years1= years1;
		$scope.formData.days1= days1;
		$scope.formData.new_name1= new_name1;
		$scope.formData.new_years1= new_years1;
		$scope.formData.new_days1= new_days1;
	
		$scope.formData.name2= name2;
		$scope.formData.years2= years2;
		$scope.formData.days2= days2;
		$scope.formData.new_name2= new_name2;
		$scope.formData.new_years2= new_years2;
		$scope.formData.new_days2= new_days2
		
		if($scope.formData.typeOfApproach == "Deterministic") {
			$scope.formData.servlife = servlife;
			$scope.formData.newservlife = newservlife;
		} 
		if($scope.formData.typeOfApproach == "Probabilistic") {
			$scope.formData.typeOfDis = distribution;
			$scope.formData.typeOfDisNew = newDistribution;
		}
	};
	
	$scope.displayTabs = 0;
	$scope.formData.detFuncShow = "dropDown";
	$scope.formData.detFuncNewShow = "dropDown";
	
	//copied the default values to $scope.master so that once user click "Restore Defaults button", it is copied to $scope.formData
	$scope.master = {typeOfApproach: sharedProperties.gettypeOfApproach().type ,detFuncShow: "dropDown", detFuncNewShow: "dropDown", typoOfScenario: typeOfScenario, servlife: 30, newservlife: 39 , cmat_val: 91.06, nmat_val: 95.3, ccon_val: 150, ncon_val: 152.78, conv_depth: 10, new_depth: 10, conv_des: 100000, new_des: 100000, conv_key: "abc", new_key: "abc", name: "Maintenance", detFuncType: "", newdetFuncType: "", years: 5, days: 10, new_name: "Maintenance", new_years: 5, new_days: 10, name1: "Resurfacing", years1: 15, days1: 20, new_name1: "Resurfacing", new_days1: 20, new_years1: 15, name2: "Replacement", years2: 30, days2: 60, new_name2: "Replacement", new_years2: 39, new_days2: 60, conv_ener: "abc", conv_enerNew: "abc"};
	
	$scope.customFullscreen = $mdMedia('xs') || $mdMedia('sm');
	 
	$scope.showConfirm = function(ev) {
    // Alert dialog once the user hits the "Restore Defaults" button
    var confirm = $mdDialog.confirm()
          .title('Would you like to restore to default values?')
          .textContent('All the values you entered will be lost!')
          .ariaLabel('Lucky day')
          .targetEvent(ev) 
          .ok('Yes')
          .cancel('No');

    $mdDialog.show(confirm).then(function() {
      $scope.formData = angular.copy($scope.master);
	  $scope.lccaFormMain.$setPristine();
    }, function() {
      //do nothing
    });
    };
  
   $scope.showPrerenderedMaintenance = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#maintenancePreRend',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
   };
   
   $scope.showPrerenderedRepair = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#repairPreRend',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
   };
   
   $scope.showPrerenderedRehab = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#rehabPreRend',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
   };
   
   $scope.showPrerenderedMatMix = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      contentElement: '#matMixPreRend',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: true
    });
   };
   
   $scope.showPrerenderedDetFunc = function(ev) {
	$mdDialog.show({
	  controller: DialogController,
	  templateUrl: 'tabDialog.detFuncCon.html',
	  parent: angular.element(document.body),
	  targetEvent: ev,
	  clickOutsideToClose: false
	})
	.then(function(answer) {
		  $scope.formData.detFuncShow = "textBox";
		  $scope.formData.detFuncCon = answer;
	}, function() {
          $scope.status = 'You cancelled the dialog.';
    });
   };
   
   $scope.showPrerenderedDetFuncNew = function(ev) {
    $mdDialog.show({
      controller: DialogController,
      templateUrl: 'tabDialog.detFuncNew.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose: false
    })
	.then(function(answer) {
		  $scope.formData.detFuncNewShow = "textBox";
		  $scope.formData.detFuncNew = answer;
	}, function() {
          $scope.status = 'You cancelled the dialog.';
    });
   };
   
   
	
	function DialogController($scope, $mdDialog) {
		$scope.pattern = (function() {
			var regexp = /^y\=([0-9])+x\+([0-9])+$/;
			return {
				test: function(value) {
					return regexp.test(value);
				}
			};
		})();
		  $scope.hide = function() {
			  $mdDialog.hide();
		  };

			$scope.cancel = function() {
			  $mdDialog.cancel();
			};

			$scope.answer = function(answer) {
			  $mdDialog.hide(answer);
			};
	}
   
   $scope.detfuncs = [ {name: "Linear"} , {name: "Polynomial"} , {name: "Custom" } ];
   $scope.detfuncsnew = [ {name: "Linear"} , {name: "Polynomial"} , {name: "Custom" } ];
	//code for the tabs part - code taken from angular material website
	var tabs = [ 
	],
	selected = null,
	previous = null;
	$scope.tabs = tabs;
    $scope.selectedIndex = 2;
    $scope.$watch('selectedIndex', function(current, old){
      previous = selected;
      selected = tabs[current];
    });
    $scope.addTab = function (title, tconvMatName, tnewMatName) {
	  $scope.displayTabs = 1;
	  tconvMatName = tconvMatName || title + " Content View";
	  tnewMatName = tnewMatName || title + " Content View";
      tabs.push({ title: title, convMatName: tconvMatName, newMatName: tnewMatName, disabled: false});
    };
    $scope.removeTab = function (tab) {
      var index = tabs.indexOf(tab);
      tabs.splice(index, 1);
    };
	
	$scope.isVisible = function() {
		if ($scope.displayTabs == 1) {
			return true;
		} else {
			return false;
		}
	}
  }]);

  
//summaryController - controller for the SUMMARY.HTML page
  
 angular.module('lccaApp').controller('summaryController',  ['$scope', '$rootScope', '$http', 'sharedProperties', '$sce', function summaryController($scope, $rootScope, $http, sharedProperties, $sce) { 
	
	//!! Need to replace this code. Have to take values from the lccaController and realController/hypoController
	$scope.lccaData = sharedProperties.getlccaData;
	
	if($scope.lccaData().typoOfScenario == "real") {
		$scope.pInfo = sharedProperties.getRealData;
		console.log("hello real");
	} else {
		$scope.pInfo = sharedProperties.getHypotheticalData;
	}
	
	
	$scope.showProgress = true;
	/*$scope.formData.servlife = 30;
	$scope.formData.newservlife = 39;
	$scope.formData.cmat_val = 91.06;
	$scope.formData.nmat_val = 95.3;
	$scope.formData.ccon_val = 150;
	$scope.formData.ncon_val = 152.78;
	$scope.formData.conv_depth = 10;
	$scope.formData.new_depth = 10;
	$scope.formData.conv_des = 100000;
	$scope.formData.new_des = 100000;
	$scope.formData.conv_key = "abc";
	$scope.formData.new_key = "abc";
	$scope.formData.conv_fun = "abc";
	$scope.formData.new_fun = "abc";*/
	
	/*$scope.formData.activityName = ["Maintenance","Resurfacing","Replacement"];
	$scope.formData.activityYears = ["5","15","30"];
	$scope.formData.activityDays = ["10","20","60"];
	$scope.formData.activityNewName = ["Maintenance","Resurfacing","Replacement"];
	$scope.formData.activityNewYears = ["5","20","39"];
	$scope.formData.activityNewDays = ["10","20","60"];
	
	
	$scope.formData.activityName[0] = "Maintenance";
	$scope.formData.activityYears[0] = "5";
	$scope.formData.activityDays[0] = "10";
	$scope.formData.activityNewName[0] = "Maintenance"
	$scope.formData.activityNewYears[0] = "5";
	$scope.formData.activityNewDays[0] = "10";
	
	$scope.formData.activityName[1] = "Resurfacing";
	$scope.formData.activityYears[1] = "15";
	$scope.formData.activityDays[1] = "20";
	$scope.formData.activityNewName[1] = "Resurfacing";
	$scope.formData.activityNewYears[1] = "20";
	$scope.formData.activityNewDays[1] = "20";
	
	$scope.formData.activityName[2] = "Replacement";
	$scope.formData.activityYears[2] = "30";
	$scope.formData.activityDays[2] = "60";
	$scope.formData.activityNewName[2] = "Replacement";
	$scope.formData.activityNewYears[2] = "39";
	$scope.formData.activityNewDays[2] = "60";
	
	
	/*$scope.formData.analysis = "75";
	$scope.formData.disc_rate = "3";
	$scope.formData.trafficVolume = "114750";
	$scope.formData.noLanes = "12";
	$scope.formData.length = "231.9";
	$scope.formData.width = "154.9";
	$scope.formData.truck = "1.55";*/
	
	$scope.lcca = [
      {
        what: 'Service Life (years)',
        conventional: '<editable model="lccaData().servlife" class="teal-text"  ng-model="lccaData().servlife"></editable>',
        newMat: '<editable model="lccaData().newservlife" class="teal-text" ng-model="lccaData().newservlife"></editable>'
      },
      {
        what: 'Material Unit Price (dollars)',
        conventional: '<editable model="lccaData().cmat_val" class="teal-text" ng-model="lccaData().cmat_val"></editable>',
        newMat: '<editable model="lccaData().nmat_val" class="teal-text" ng-model="lccaData().nmat_val"></editable>'
      },
      {
        what: 'Construction Unit Price (dollars)',
        conventional: '<editable model="lccaData().ccon_val" class="teal-text" ng-model="lccaData().ccon_val"></editable>',
        newMat: '<editable model="lccaData().ncon_val" class="teal-text" ng-model="lccaData().ncon_val"></editable>'
      },
      {
        what: 'Depth (inch)',
        conventional: '<editable model="lccaData().conv_depth" class="teal-text" ng-model="lccaData().conv_depth"></editable>',
        newMat: '<editable model="lccaData().new_depth" class="teal-text" ng-model="lccaData().new_depth"></editable>'
      },
      {
        what: 'Design/Lab testing cost (dollars)',
        conventional: '<editable model="lccaData().conv_des" class="teal-text" ng-model="lccaData().conv_des"></editable>',
        newMat: '<editable model="lccaData().new_des" class="teal-text" ng-model="lccaData().new_des"></editable>'
      },
	  {
        what: 'Key deterioration mode',
        conventional: '<editable model="lccaData().conv_key" class="teal-text" ng-model="lccaData().conv_key"></editable>',
        newMat: '<editable model="lccaData().new_key" class="teal-text" ng-model="lccaData().new_key"></editable>'
      },
	  {
        what: 'Deterioration function',
        conventional: '<editable model="lccaData().conv_fun" class="teal-text" ng-model="lccaData().conv_fun"></editable>',
        newMat: '<editable model="lccaData().new_fun" class="teal-text" ng-model="lccaData().new_fun"></editable>'
      },
	  {
        what: 'Environmental enery function',
        conventional: '<editable model="lccaData().conv_ener" class="teal-text" ng-model="lccaData().conv_ener"></editable>',
        newMat: '<editable model="lccaData().conv_enerNew" class="teal-text" ng-model="lccaData().conv_enerNew"></editable>'
      }
    ];
	
	//This is for loading the Project Information values in the Summary page.
    $scope.projectInfo = [
      {
        what: 'Analysis Period (years)',
        who: '<editable model="pInfo().analysis" name="analysis" ng-model="pInfo().analysis"></editable>',
        when: '3:08PM'
      },
      {
        what: 'Discount rate (%)',
        who: '<editable model="pInfo().disc_rate" name="disc_rate" ng-model="pInfo().disc_rate"></editable>',
        when: '3:08PM'
      },
      {
        what: 'Traffic Volume (vehicle/day)',
        who: '<editable model="pInfo().trafficVolume" ng-model="pInfo().trafficVolume"></editable>',
        when: '3:08PM'
      },
      {
        what: 'Number Of Lanes',
        who: '<editable model="pInfo().noLanes" ng-model="pInfo().noLanes"></editable>',
        when: '3:08PM'
      },
      {
        what: 'Length Of Structure (feet)',
        who: '<editable model="pInfo().length" ng-model="pInfo().length"></editable>',
        when: '3:08PM'
      },
	  {
        what: 'Width Of Structure (feet)',
        who: '<editable model="pInfo().width" ng-model="pInfo().width"></editable>',
        when: '3:08PM'
      },
	  {
        what: 'Truck Percentage (%)',
        who: '<editable model="pInfo().truck" ng-model="pInfo().truck"></editable>',
        when: '3:08PM'
      },
    ];
	
	$scope.yourname = "value";
	
	//This is for loading the Life Cycle Cost Analysis values in the Summary page.
	
	$scope.accordianData = [  
                                { "heading" : "Maintenance Activity", "name": '<editable model="lccaData().name" ng-model="lccaData().name"></editable>',
																	  "years": '<editable model="lccaData().years" ng-model="lccaData().years"></editable>',
																	  "days": '<editable model="lccaData().days" ng-model="lccaData().days"></editable>',
																	  "new_name": '<editable model="lccaData().new_name" ng-model="lccaData().new_name"></editable>',
																	  "new_years": '<editable model="lccaData().new_years" ng-model="lccaData().new_years"></editable>',
																	  "new_days": '<editable model="lccaData().new_days" ng-model="lccaData().new_days"></editable>',
																	  "content" : $sce.trustAsHtml("<table class='centered'>" +
																										"<thead>" +
																											"<tr>" +
																												"<th>Material</th>" +
																												"<th>Name of Activity</th>" +
																												"<th>Schedule(in years)</th>" +
																												"<th>Work Zone Duration(in days)</th>" +
																											"</tr>" +
																										"</thead>" +
																										"<tbody>" +
																											"<tr>" +
																												"<td> Conventional Material </td>" +
																												"<td><editable model='lccaData().name' ng-model='lccaData().name'></editable></td>" +
																												"<td><editable model='lccaData().years' ng-model='lccaData().years'></editable></td>" +
																												"<td><editable model='lccaData().days' ng-model='lccaData().days'></editable></td>" +
																											"</tr>" +
																											"<tr>" +
																												"<td>New material</td>" +
																												"<td><editable model='lccaData().new_name' ng-model='lccaData().new_name'></editable></td>" +
																												"<td><editable model='lccaData().new_years' ng-model='lccaData().new_years'></editable></td>" +
																												"<td><editable model='lccaData().new_days' ng-model='lccaData().new_days'></editable></td>" +
																											"</tr>" +
																										"</tbody>" +
																									"</table>")},
                                { "heading" : "Repair Activity", "name": '<editable model="lccaData().name1" ng-model="lccaData().name1"></editable>',
																  "years": '<editable model="lccaData().years1" ng-model="lccaData().years1"></editable>',
																  "days": '<editable model="lccaData().days1" ng-model="lccaData().days1"></editable>',
																  "new_name": '<editable model="lccaData().new_name1" ng-model="lccaData().new_name1"></editable>',
																  "new_years": '<editable model="lccaData().new_years1" ng-model="lccaData().new_years1"></editable>',
																  "new_days": '<editable model="lccaData().new_days1" ng-model="lccaData().new_days1"></editable>', 								
																  "content" : $sce.trustAsHtml("<table class='centered'>" +
																								"<thead>" +
																									"<tr>" +
																										"<th data-field='id'>Material</th>" +
																										"<th data-field='id'>Name of Activity</th>" +
																										"<th data-field='name'>Schedule(in years)</th>" +
																										"<th data-field='price'>Work Zone Duration(in days)</th>" +
																									"</tr>" +
																								"</thead>" +
																								"<tbody>" +
																									"<tr>" +
																										"<td> Conventional Material </td>" +
																										"<td><editable model='lccaData().name1' ng-model='lccaData().name1'></editable></td>" +
																										"<td><editable model='lccaData().years1' ng-model='lccaData().years1'></editable></td>" +
																										"<td><editable model='lccaData().days1' ng-model='lccaData().days1'></editable></td>" +
																									"</tr>" +
																									"<tr>" +
																										"<td ng-model='servlife'> New Material </td>" +
																										"<td><editable model='lccaData().new_name1' ng-model='lccaData().new_name1'></editable></td>" +
																										"<td><editable model='lccaData().new_years1' ng-model='lccaData().new_years1'></editable></td>" +
																										"<td><editable model='lccaData().new_days1' ng-model='lccaData().new_days'></editable></td>" +
																									"</tr>" +
																								"</tbody>" +
																							  "</table>") },
                                { "heading" : "Rehabilitation Activity", "name": '<editable model="lccaData().name2" ng-model="lccaData().name2"></editable>',
																	  "years": '<editable model="lccaData().years2" ng-model="lccaData().years2"></editable>',
																	  "days": '<editable model="lccaData().days2" ng-model="lccaData().days2"></editable>',
																	  "new_name": '<editable model="lccaData().new_name2" ng-model="lccaData().new_name2"></editable>',
																	  "new_years": '<editable model="lccaData().new_years2" ng-model="lccaData().new_years2"></editable>',
																	  "new_days": '<editable model="lccaData().new_days2" ng-model="lccaData().new_days2"></editable>',   
																	  "content" : $sce.trustAsHtml("<table class='centered'>" +
																											"<thead>" +
																												"<tr>" +
																													"<th>Material</th>" +
																													"<th>Name of Activity</th>" +
																													"<th>Schedule(in years)</th>" +
																													"<th>Work Zone Duration(in days)</th>" +
																												"</tr>" +
																											"</thead>" +
																											"<tbody>" +
																												"<tr>" +
																													"<td> Conventional Material </td>" +
																													"<td><editable model='lccaData().name2' ng-model='lccaData().name2'></editable></td>" +
																													"<td><editable model='lccaData().years2' ng-model='lccaData().years2'></editable></td>" +
																													"<td><editable model='lccaData().days2' ng-model='lccaData().days2'></editable></td>" +
																												"</tr>" +
																												"<tr>" +
																													"<td> New Material </td>" +
																													"<td><editable model='lccaData().new_name2' ng-model='lccaData().new_name2'></editable></td>" +
																													"<td><editable model='lccaData().new_years2' ng-model='lccaData().new_years2'></editable></td>" +
																													"<td><editable model='lccaData().new_days2' ng-model='lccaData().new_days2'></editable></td>" +
																												"</tr>" +
																											"</tbody>" +
																										"</table>") },
                                { "heading" : "Material mix & distribution", "content" : "" },
                             ];
      $scope.toggleView = function(ary, data, index){
        for(var i=0; i<ary.length; i++){
          if(i!=index) { ary[i].expanded=false; }
          else { data.expanded=!data.expanded; }
        }
      };
	  
	  var columnChartValues = null;
	  var pieChartValues = null;
	  var pieChartValues2 = null;
	  var lcca_conv = null;
	  var lcca_new = null;
	  
	//This piece of code runs when user clicks "calculate cost" in Summary page. Asynchronous call to php/output.php api for calculating the Life cycle cost
	$scope.processForm = function(analysis, disc_rate, trafficVolume, noLanes, length, width, truck, servlife, newservlife, cmat_val, nmat_val, ccon_val, ncon_val, conv_depth, new_depth, conv_des, new_des, conv_key, new_key, conv_fun, new_fun, conv_ener, conv_enerNew) {
		console.log(width);
		$scope.showProgress = false;
		var data = {"analysis"			: analysis, 
					"disc_rate"			: disc_rate, 
					"trafficVolume"		: trafficVolume,
					"noLanes"  			: noLanes,
		            "length" 			: length,
		            "width"				: width,
					"truck" 			: truck,
		            "servlife" 			: servlife,
		            "newservlife"		: newservlife,
		            "cmat_val" 			: cmat_val,
		            "nmat_val"			: nmat_val,
		            "ccon_val" 			: ccon_val,
		            "ncon_val" 			: ncon_val,
		            "conv_depth" 		: conv_depth,
		            "new_depth" 		: new_depth,
		            "conv_des" 			: conv_des,
		            "new_des" 			: new_des,
		            "conv_key" 			: conv_key,
		            "new_key" 			: new_key,
		            "conv_fun" 			: conv_fun,
		            "new_fun" 			: new_fun,
		            "conv_ener"			: conv_ener,
		            "conv_enerNew"		: conv_enerNew,
					"activityName"		: ["Maintenance","Resurfacing","Replacement"],
					"activityYears" 	: [5,15,30],
					"activityDays" 		: [10,20,60],	
					"activityNewName"	: ["Maintenance","Resurfacing","Replacement"],
		            "activityNewYears"	: [5,20,39],
		            "activityNewDays"	: [10,20,60]
		};
		
		console.log(data);
		
		$scope.resultData = {};
		$scope.resultData.analysis = analysis;
		$scope.resultData.disc_rate = disc_rate;
		$scope.resultData.trafficVolume = trafficVolume;
		$scope.resultData.noLanes 		= noLanes;
		$scope.resultData.length 		= length;
		$scope.resultData.width 		= width;
		$scope.resultData.truck 		= truck;
		
		$scope.resultData.servlife 		= servlife;
		$scope.resultData.newservlife   = newservlife;
		$scope.resultData.cmat_val 		= cmat_val;
		$scope.resultData.nmat_val		= nmat_val;
		$scope.resultData.ccon_val 		= ccon_val;
		$scope.resultData.ncon_val 		= ncon_val;
		$scope.resultData.conv_depth 	= conv_depth;
		$scope.resultData.new_depth 	= new_depth;
		$scope.resultData.conv_des 		= conv_des;
		$scope.resultData.new_des 		= new_des;
		$scope.resultData.conv_key 		= conv_key;
		$scope.resultData.new_key 		= new_key;
		$scope.resultData.conv_fun 		= conv_fun;
		$scope.resultData.new_fun 		= new_fun;
		$scope.resultData.conv_ener		= conv_ener;
		$scope.resultData.conv_enerNew	= conv_enerNew;
		
		$scope.resultData.activityName 		= ["Maintenance","Resurfacing","Replacement"];
		$scope.resultData.activityYears 	= ["5","15","30"];
		$scope.resultData.activityDays 		= ["10","20","60"];
		$scope.resultData.activityNewName	= ["Maintenance","Resurfacing","Replacement"];
		$scope.resultData.activityNewYears	= ["5","20","39"];
		$scope.resultData.activityNewDays	= ["10","20","60"];
		
		
		$scope.resultData.activityName[0] 		= "Maintenance";
		$scope.resultData.activityYears[0] 		= "5";
		$scope.resultData.activityDays[0] 		= "10";
		$scope.resultData.activityNewName[0] 	= "Maintenance"
		$scope.resultData.activityNewYears[0] 	= "5";
		$scope.resultData.activityNewDays[0] 	= "10";
		
		$scope.resultData.activityName[1] 		= "Resurfacing";
		$scope.resultData.activityYears[1] 		= "15";
		$scope.resultData.activityDays[1] 		= "20";
		$scope.resultData.activityNewName[1] 	= "Resurfacing";
		$scope.resultData.activityNewYears[1] 	= "20";
		$scope.resultData.activityNewDays[1] 	= "20";
		
		$scope.resultData.activityName[2] 		= "Replacement";
		$scope.resultData.activityYears[2] 		= "30";
		$scope.resultData.activityDays[2] 		= "60";
		$scope.resultData.activityNewName[2] 	= "Replacement";
		$scope.resultData.activityNewYears[2] 	= "39";
		$scope.resultData.activityNewDays[2] 	= "60";
		
		$http.post("/output", data)
		  .success(function(data) { //data received in "~" separated values in the form of ["Column chart values"~"Pie chart values for Conventional material"~"Pie chart values for New material"~"Life Cycle Cost of conventional material"~"Life Cycle Cost of New material"]
			console.log(data.ColumnChartValues);
			console.log(data.PieChartValues);
			console.log(data.PieChartValues2);
			columnChartValues = JSON.parse(data.ColumnChartValues);
			pieChartValues = JSON.parse(data.PieChartValues);
			pieChartValues2 = JSON.parse(data.PieChartValues2);
			lcca_conv = JSON.parse(data.lifeCycleCostConv);
			lcca_new = JSON.parse(data.lifeCycleCostNew);
			$http.post("/probabilisticOutput", data)
			  .success(function(data) { //data received in "~" separated values in the form of ["Column chart values"~"Pie chart values for Conventional material"~"Pie chart values for New material"~"Life Cycle Cost of conventional material"~"Life Cycle Cost of New material"]
				$scope.showProgress = true;
				drawChart(columnChartValues, pieChartValues, pieChartValues2);
				console.log(data);
			})
			.error(function(data) {
				console.log("error");
				console.log(data);
			});
 	    })
		.error(function(data) {
            console.log("error");
            console.log(data);
        });
		
	};
	
	$scope.openNewTab = function() {
		window.location = "#/graph";
	};
	
  }]);
  
  
angular.module('lccaApp').directive('editable', function() {
	 return {
        restrict: 'E',
        scope: {model: '='},
        replace: false,
        template: 
		'<span>'+
			'<input type="text" ng-model="model" ng-show="edit" ng-enter="edit=false"></input>'+
				'<span ng-show="!edit" style="text-decoration:underline">{{model}}</span>'+
		'</span>',
        link: function(scope, element, attrs) {         
            scope.edit = false;
            element.bind('click', function() {
                scope.$apply(scope.edit = true);
                element.find('input').focus();
            });                    
        }
    };
});

angular.module('lccaApp').directive('ngEnter', function () {
    return function(scope, element, attrs) {
        element.bind('keypress', function(e) {
            if (e.charCode === 13 || e.keyCode ===13 ) {
              scope.$apply(attrs.ngEnter);
            }
        });
    };
});

angular.module('lccaApp').directive('compile', ['$compile', function ($compile) {
    return function(scope, element, attrs) {
        scope.$watch(
            function(scope) {
                // watch the 'compile' expression for changes
                return scope.$eval(attrs.compile);
            },
            function(value) {
                // when the 'compile' expression changes
                // assign it into the current DOM
                element.html(value);

                // compile the new DOM and link it to the current
                // scope.
                // NOTE: we only compile .childNodes so that
                // we don't get into infinite loop compiling ourselves
                $compile(element.contents())(scope);
            }
        );
    };
}])

