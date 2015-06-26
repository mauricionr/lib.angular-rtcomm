


rtcommPageApp.controller('RtcommRegisterDemoCtrl', function($scope)
{

});

rtcommPageApp.controller('RtcommVideoDemoCtrl', function($scope, RtcommService){
	
	/* Rtcomm Bot works as the user to place the call */
	var demoCallerID = 'rtcomm-bot';
	
	/* Place a call to another user */
	$scope.placeCall = function(){
		//Use the RtcommService to place a call to a user, enable video and audio using 'webrtc'
		RtcommService.placeCall(demoCallerID, ['webrtc']);

	}

	/* Stop the active call */
	$scope.stopCall = function(){
		
		/* Get the active endpoint in the session */
		var activeEndpointUUID =  RtcommService.getActiveEndpoint();
	
		var activeEndpoint = RtcommService.getEndpoint(activeEndpointUUID);
		
		/* Disconnect the endpoint from the session */
		activeEndpoint.disconnect();
		

	}

})


rtcommPageApp.controller('RtcommChatDemoCtrl', function($scope, RtcommService){

	/* Start chatting with rtcomm-bot */
	$scope.startChat = function(){
		/* Check if the endpoint is already connected */
		var status = RtcommService.getSessionState(RtcommService.getActiveEndpoint());
		
		/* Not connected to rtcomm-bot? Start chatting! */	
		if(status == 'session:stopped'){
			
			/* Start chat session with rtcomm-bot*/
			RtcommService.placeCall('rtcomm-bot', ['chat']);
		}
		
		/* Already in a video call with rtcomm-bot? Start chatting! */
		else if(status == 'session:started'){
			//Get the current active endpoint	
			var openEndpoint = RtcommService.getEndpoint(RtcommService.getActiveEndpoint());

			openEndpoint.chat.enable();

		}

	}	

        /* Disconnect the user from the session */
	$scope.stopChat = function(){

		 /* Get the active endpoint in the session */
                var activeEndpointUUID =  RtcommService.getActiveEndpoint();
         
                var activeEndpoint = RtcommService.getEndpoint(activeEndpointID);

                /* Disconnect the endpoint from the session */
                activeEndpoint.disconnect();
	}
})

rtcommPageApp.controller('RtcommEndpointStatusDemoCtrl', function($scope, RtcommService){

	

})

rtcommPageApp.controller('RtcommPresenceDemoCtrl', function($scope, RtcommService){


});


rtcommPageApp.controller('RtcommSessionMgrDemoCtrl', function($scope, RtcommService){


});

rtcommPageApp.controller('RtcommQueuesDemoCtrl', function($scope, RtcommService){



});

