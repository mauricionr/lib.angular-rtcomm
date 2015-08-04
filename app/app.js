
/* Define the angular-rtcomm Landing Page application */
var rtcommPageApp = angular.module('rtcomm.angular.page', ['angular-rtcomm','ui.router','ngSanitize']);

/* Configuration for the application */
rtcommPageApp.config(function( $stateProvider, $urlRouterProvider)
{
	/* Default path */
	var path = '/lib.angular-rtcomm/';
	
	/* Default value */
	$urlRouterProvider.otherwise('/lib.angular-rtcomm/');
	
	/* Define the states for the views */
	$stateProvider
	
	/* Home page is the landing page '/' */
	.state('home', {
		url: '/lib.angular-rtcomm/',
		views:	{
			
			/* Introduction, contains the overview and getting started guide of the angular-rtcomm module */
			'':{templateUrl: path+'templates/landing-page.html' },
			'introduction@home':{templateUrl: path+ 'templates/introduction.html'},
			

			/* Direcive Views Routed as a sub-view for the landing page */			
			'register-demo@home' : {
				templateUrl: path+ 'templates/register-demo.html',
				controller: 'RtcommRegisterDemoCtrl'
			},

			'video-demo@home':{
				templateUrl: path+'templates/video-demo.html',
				controller: 'RtcommVideoDemoCtrl'


			},	
			
			'chat-demo@home':{
				templateUrl:path+ 'templates/chat-demo.html',
				controller: 'RtcommChatDemoCtrl'


			},

			'endpoint-status-demo@home':{
				templateUrl: path+'templates/endpoint-status-demo.html',
				controller: 'RtcommEndpointStatusDemoCtrl'
			},		
			
			'presence-demo@home':{
				templateUrl: path+ 'templates/presence-demo.html',
				controller: 'RtcommPresenceDemoCtrl'
			},
			'sessionmgr-demo@home':{
				templateUrl: path+ 'templates/sessionmgr-demo.html',
				controller: 'RtcommSessionMgrDemoCtrl'

			},
			
			'queues-demo@home':{
				templateUrl: path+ 'templates/queues-demo.html',
				controller: 'RtcommQueuesDemoCtrl'
			}
		}
		})
});

/* Directive for the page navigation bar */
rtcommPageApp.directive('pageNavbar', function()
{

	return {
		restrict: 'E',
		templateUrl: 'templates/navbar.html',
		controller: function($scope,$log)
		{

			$scope.title = "angular-rtcomm";
			$scope.gettingStarted = "Getting Started";
			$scope.directives = [

                                {title: "Register", id:"register"},
				{title: "Video", id: "video"},
				{title: "Chat", id: "chat"},
				{title: "Endpoint Status", id: "endpoint-status"},
				{title: "Presence", id: "presence"},
				{title: "Session Manager", id: "sessionmgr"},
				{title: "Queues", id: "queues"}
			]

			$scope.docs = "Docs";
			$scope.community = "Community";
			$scope.demos = "Demos";
			


		}
	}
});



/* Define the functions to run once the angular-rtocmm module has been configurated */
rtcommPageApp.run(function(RtcommService, $state, $rootScope, $modal, $log){
	
	
	$rootScope.$state = $state;
	$rootScope.registered = false;
	
	/* Global function to be called to open the registration modal */
	$rootScope.openModal = function(){

		     var modalInstance = $modal.open({
                                animation: true,
                                templateUrl: 'templates/modal-register.html',
                                controller: function($scope, $modalInstance, $log){

                                        $scope.cancel = function(){

                                                $modalInstance.dismiss('cancel');

                                        }
					
					/* Modal handles registration event */
					$scope.$on('rtcomm::init', function(event, success, details){
						$log.debug('LandingPageApp ---> Registration Modal ---> RtcommInit');

						if(success==true){
							$log.debug('LandingPageApp --> Registration Modal ---> Registration Successful')
							$scope.cancel();
	
						}
					})

                                }


                        });
	}
	
	/* Handles the broadcast for when the endpoint is intiailized, here we check if the registration is succcessful */
	$rootScope.$on('rtcomm::init', function(event, success, details){

		$log.debug('LandingPageApp ---> RtcommInit');

		if(success==true){

	                $log.debug('LandingPageApp ---> Registration Successful');

			$rootScope.registered = true;
		}
	})

	/* Handles the event in which the endpoint is destroyed (uninitialized?);*/
	$rootScope.$on('destroyed', function(event, args){
		$log.debug('LandingPageapp ---> RtcommDestroyed');

		
		$rootScope.registered = false;
	})
});

rtcommPageApp.directive('registered', function(){
	
		
	return {
		restrict: 'C',
		terminal: true,
		link: function(scope, element, attr){
			
			var clickAction = attr.ngClick;
			element.bind('click', function(event){
				if(!scope.registered){
				
					scope.openModal();
					event.stopImmediatePropagation();
					event.preventDefault()
				}	

			});
		}
	}

});

/* Replace the break lines byu new lines */
function replaceText(str)
{
    var str1 = String(str);
    return str1.replace(/\n/g,"<br/>");
}

/* Used to dynamically 'prettyprint' the code blocks of the page */
rtcommPageApp.directive('prettyprint', function() {
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {
                element.html(prettyPrintOne(replaceText(element.html()),'',true));
            }
    };
});


