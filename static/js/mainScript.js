var lccaApp = angular.module('lccaApp', ['angularUtils.directives.uiBreadcrumbs', 'ui.router', 'ngMaterial', 'ngMessages', 'ngRoute', 'ngSanitize', 'ngMdIcons']);
   
lccaApp.config(function($stateProvider, $urlRouterProvider) {
        
		$urlRouterProvider.otherwise('/video');
		
		$stateProvider
        
        // HOME STATES AND NESTED VIEWS ========================================
        .state('home', {
            url: '/video',
            views: {
			'main@': {
			  templateUrl: './static/pages/video.html',
			}
			},
			data: {
                displayName: 'Home'
            }
        })
        
        // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
        .state('home.hypothetical', {

            //url : '/hypothetical',
			url: '/hypothetical',
			  views: {
				'main@': {
				  templateUrl: './static/pages/hypothetical.html',
				  controller  : 'hypoController'
				}
  		    },
			data: {
                displayName: 'Hypothetical Scenario(Deterministic)'
            }
        })
		
		
		.state('home.real', {
            //url : '/real',
			url: '/real',
			  views: {
				'main@': {
				  templateUrl: './static/pages/real.html',
				  controller  : 'realController'
				}
  		    },
			data: {
                displayName: 'Real Infrastructure in NJ(Deterministic)'
            }
        })
		
		.state('home.hypothetical.lcca', {
			url: '/lcca',
			  views: {
				'main@': {
				 templateUrl: './static/pages/lcca.html',
				 controller  : 'lccaController'
				}
  		    },
			 data: {
                displayName: 'Life Cycle Cost Analysis'
            }
        })
		
		.state('home.real.lcca', {
			url: '/lcca',
			  views: {
				'main@': {
				  templateUrl: './static/pages/lcca.html',
				  controller  : 'lccaController'
				}
  		    },
			 data: {
                displayName: 'Life Cycle Cost Analysis'
            }
        })
		
		.state('home.hypothetical.lcca.inputSummary', {
			url: '/summary',
			  views: {
				'main@': {
				  templateUrl: './static/pages/summary.html',
				  controller  : 'summaryController'
				}
  		    },
            //url : '/summary',
			data: {
                displayName: 'Summary'
            }
        })
		
		.state('home.real.lcca.inputSummary', {
			url: '/summary',
			  views: {
				'main@': {
				  templateUrl: './static/pages/summary.html',
				  controller  : 'summaryController'
				}
  		    },
            //url : '/summary',
			data: {
                displayName: 'Summary'
            }
        })
		
		.state('graph', {
            //url : '/graph',
			templateUrl: './static/pages/graph.html',
            controller  : 'graphController',
			 data: {
                displayName: 'Output graph'
            }
        });
		
		
		
		
		
		/*$routeProvider
			.when('/', {
                templateUrl : 'pages/video.html',
                controller  : 'videoController'
            })

            // route for the about page
            .when('/hypothetical', {
                templateUrl : 'pages/hypothetical.html',
                controller  : 'hypoController'
            })

            // route for the contact page
            .when('/real', {
                templateUrl : 'pages/real.html',
                controller  : 'realController'
            })
			
			.when('/lcca', {
                templateUrl : 'pages/lcca.html',
                controller  : 'lccaController'
            })
			
			.when('/summary', {
				templateUrl : 'pages/summary.html',
				controller : 'summaryController'
			})
			
			
			.when('/graph', {
				templateUrl : 'pages/graph.html',
				controller : 'graphController'
			})
		*/
    });
	
	

	
	
	
