	var arDrone = require('ar-drone');
	var client= arDrone.createClient();

(function() {
	var test = function(data){
		console.log("start");
		timeStart=new Date().getTime();
		client.takeoff(
			function(){
				/*timeStop=new Date().getTime();
				console.log(timeStop-timeStart);
				this.stop();
				console.log("STOP");	
				this.back(0.1);
				this.after(500,
					function(){
						timeDown=new Date().getTime();
						console.log(timeDown-timeStop);
						this.stop();
						console.log("go-down");	
						this.down(0.2);
					}
				);
				this.after(5000,
					function(){*/
						timeLand=new Date().getTime();
						console.log(timeLand-timeDown);
						console.log("land");	
						this.land(
							function(){
								console.log(new Date().getTime()-timeLand);
							}
						);
					}
				);
//			}
//		);		
	}
	var event=function (ev,callback){
	}
	var stream = function(callback){
		var video = client.getVideoStream();
		video.on('data', function(a){console.log(a);callback(a)});
		video.on('error', callback);		
	}
	module.exports.test = function(data) {return test(data); }
	module.exports.stream = function(callback){return stream(callback);} 
	module.exports.on = function(ev, callback) {return event(ev,callback); }
}());
