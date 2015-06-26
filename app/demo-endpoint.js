
/* Initialize the Rtcomm Mockup Server */

rtcomm._MockRtcommServer.init();

/* Demo endpoint to be used, all calls will be made
 * to this user, preferably we could make sort of a demo bot */
var demoEndpointProvider = new rtcomm.EndpointProvider();

/* Endpoint for real time comunications */
var demoEndpoint = null;


/* Register the demo endpoint to the mockup server */
var registerDemoEndpointProvider = function(){

	var demoConfig = {

		'server': 'localhost',
		'port': 1883,
		'userid': 'rtcomm-bot',
		'createEndpoint': true,
		'presence': {'topic': 'demo'}


	};
	
	/* Initialize the endpoint provider */	
	demoEndpointProvider.init(demoConfig, onEndpointRegistrationSuccess, onEndpointRegistrationFailure);

	/* Success callback for endpoint registration */
	function onEndpointRegistrationSuccess(object){

		console.log('******** DemoEndpointProvider Registered Successfully *******');
		console.log(object);		
		/* Object has the registered endpoint */
		demoEndpoint = object.endpoint;

		/* Setup webrtc communication */
		demoEndpoint.webrtc.setLocalMedia(

			{
				enable:false,
				mediaOut: document.querySelector('#demoSelfView'),
				mediaIn:document.querySelector('#demoRemoteView')
			}

		)
		
		/*Enable WebRTC */
//		demoEndpoint.webrtc.enable({'trickleICE': false, lazyAV: false},function(){
//			console.log("****** DemoEndpoint WebRTC Enabled *******");
//		});
	}
	
	/* Failure callback for endpoint registration*/
	function onEndpointRegistrationFailure(error){

		console.error('DemoEndpoint Failed to initialize: ', error);

	}

}

/* Setup the Endpoint Configuration for events and protocols */
demoEndpointProvider.setRtcommEndpointConfig({

	broadcast: { audio: true, video: true},
	webrtc:true,
	'session:started': function(eventObject){
		console.log('DemoEndpoint Starting a Session ********');
		
	},

	'session:ringing': function(eventObject){
		console.log('DemoEndpoint making a Call (Ringing)');
		
	},

	'session:alerting': function(eventObject){
		console.log("DemoEndpoint - Inbound Call");
		 /*Enable WebRTC */
//                demoEndpoint.webrtc.enable({'trickleICE': false, lazyAV: false},function(){
  //                      console.log("****** DemoEndpoint WebRTC Enabled *******");
    //            });

		eventObject.endpoint.accept();
	},
	'chat:connected': function(eventObject){
		console.log("Demo Endpoint - ChatConnected");
		
		var welcomeMessage = "Welcome! I'm rtcomm-bot";
		
		demoEndpoint.chat.send(welcomeMessage);
	},
	'chat:message': function(eventObject){

		console.log("Demo Endpoint - ChatMessage");

		//Return the receive message in reverse
		var message = eventObject.message.message;
			
		function reverse(s){

			var rev = '';
			for (var i = s.length - 1; i >= 0; i--)
			{
				rev += s[i];
			}

			return rev;
		}

		setTimeout(function(){
		demoEndpoint.chat.send(reverse(message));
		},1000);
	}


});

registerDemoEndpointProvider();

