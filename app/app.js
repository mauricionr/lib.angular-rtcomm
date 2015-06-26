

var rtcommPageApp = angular.module('rtcomm.angular.page', ['angular-rtcomm','ui.router','ngSanitize']);


rtcommPageApp.config(function($stateProvider, $urlRouterProvider)
{


	$urlRouterProvider.otherwise('/');
	
	$stateProvider
	
	.state('home', {
		url: '/',
		views:	{

			'':{templateUrl: 'templates/landing-page.html' },
			'introduction@home':{templateUrl: 'templates/introduction.html'},
			


			/* Direcive Views Routed as a sub-view for the landing page */			
			'register-demo@home' : {
				templateUrl: 'templates/register-demo.html',
				controller: 'RtcommRegisterDemoCtrl'
			},

			'video-demo@home':{
				templateUrl: 'templates/video-demo.html',
				controller: 'RtcommVideoDemoCtrl'


			},	
			
			'chat-demo@home':{
				templateUrl: 'templates/chat-demo.html',
				controller: 'RtcommChatDemoCtrl'


			},

			'endpoint-status-demo@home':{
				templateUrl: 'templates/endpoint-status-demo.html',
				controller: 'RtcommEndpointStatusDemoCtrl'
			},		
			
			'presence-demo@home':{
				templateUrl: 'templates/presence-demo.html',
				controller: 'RtcommPresenceDemoCtrl'
			},

			'sessionmgr-demo@home':{
				templateUrl: 'templates/sessionmgr-demo.html',
				controller: 'RtcommSessionMgrDemoCtrl'

			},
			
			'queues-demo@home':{
				templateUrl: 'templates/queues-demo.html',
				controller: 'RtcommQueuesDemoCtrl'
			}
		}
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
			{title: "Video", id: "video"},
			{title: "Chat", id: "chat"},
			{title: "Register", id:"register"}]

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


rtcommPageApp.run(function(RtcommService){
//	RtcommService.register('demo-guest');

});
