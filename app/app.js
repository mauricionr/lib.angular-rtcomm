

var rtcommPageApp = angular.module('rtcomm.angular.page', ['angular-rtcomm','ui.router','ngSanitize']);


rtcommPageApp.config(function( $stateProvider, $urlRouterProvider)
{
	console.log("hellok");	
	var path = '/lib.angular-rtcomm/';
	$urlRouterProvider.otherwise('/lib.angular-rtcomm/');
	
	$stateProvider
	
	.state('home', {
		url: '/lib.angular-rtcomm/',
		views:	{

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

	.state('api', {
		
		views:{

			'':{
				templateUrl:path+ 'templates/api.html',
				controller: 'APIDocsCtrl'
			}
		}		

	})



	API_DOCS.pages.forEach(function(page, index){
		$stateProvider.state(page.state,{templateUrl:  page.templateUrl});		

	});





});


rtcommPageApp.directive('pageNavbar', function()
{

	return {
		restrict: 'E',
		templateUrl: 'templates/navbar.html',
		controller: function($scope,$log)
		{

			$scope.title = "Angular Rtcomm";
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
function replaceText(str)
{
    var str1 = String(str);
    return str1.replace(/\n/g,"<br/>");
}
rtcommPageApp.directive('prettyprint', function() {
    return {
        restrict: 'C',
        link: function postLink(scope, element, attrs) {
		element.html(prettyPrintOne(replaceText(element.html()),'',true));
	    }
    };
});


rtcommPageApp.run(function(RtcommService, $state, $rootScope, $modal, $log){
	$rootScope.$state = $state;
	$log.log("READDYYY!");	
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

rtcommPageApp.controller('APIDocsCtrl', function($scope){
	
	$scope.directives = [];
	$scope.services = [];
	
	API_DOCS.pages.forEach(function(page, index){
		
		if(page.category == "directive")
			$scope.directives.push(page);
		else if(page.category == "service")
			$scope.services.push(page);

	})	

})
