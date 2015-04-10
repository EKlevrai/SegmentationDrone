(function() {
	var arDrone = require('ar-drone');
	var socketHandler = require('./socketHandler.js');

	/**
	 * le drone est le client créé par arDrone
	 */
	function FlightData(cl){
		this.manual=false;
		this.sequence="STOPPED";//sequence is STOPPED, TAKING_OFF, LANDING, TAKING_OFF_TO_MANUAL,MANUAL
		this.moving={//list of moving
				"forward" : 0,//[-100,100] decrit graduellement les valeurs d'inclinaison pour aller vers l'avant ou vers l'arriere
				"left" : 0,//[-100,100]decrit graduellement les valeurs d'inclinaison pour aller vers la gauche ou vers la droite
				"alt" : 0,//{1,0,-1} decrit la prise d'altitude ou non
				"clockwise" : 0//{1,0,-1} decrit la rotation ou non selon le sens horaire
					};
		this.client=cl;		
	}
	/**
	 * 
	 */
	FlightData.prototype.startTakeOff = function(){
		if(!this.manual && this.sequence=="STOPPED"){
			this.manual=false;
			this.sequence="TAKING_OFF_TO_MANUAL";
			var that=this;
			this.client.takeoff(function(){startManual(that)});
			
		}
		else console.log(this.manual + " " + this.sequence);
	}
	/**
	 * 
	 */
	FlightData.prototype.startTakeOffAuto = function(callback){
		if(!this.manual && this.sequence=="STOPPED"){
			this.manual=false;
			this.sequence="TAKING_OFF";
			var that=this;
			this.client.takeoff(callback);
			
		}
		else console.log(this.manual + " " + this.sequence);
	}
	/**
	 * 
	 */
	
	FlightData.prototype.scriptTest = function()
	{
		this.forward(0.1);
		while(emergency_hazard == false)
		{
			
		}
		this.land();
	}
	/**
	 * 
	 */
	function startManual(that){
		console.log("GOJAMES");
		socketHandler.send("MODE_MANUAL");
		if(!that.manual){
			that.manual=true;
			that.sequence="MANUAL";
			that.moving={
					"forward" : 0,
					"left" : 0,
					"alt" : 0,
					"clockwise" : 0
						};
		}
		that.actualise();
	}
	
	FlightData.prototype.actualise = function(){
		if(this.manual){
			if(this.moving=={"clockwise":0,"alt":0,"left":0,"forward":0}){this.client.stop();console.log("STOP");}
			else{
				switch(this.moving.clockwise){
				//case 1 : this.client.clockwise(0.25);			break;
				//case -1 : this.client.counterClockwise(0.25);	break;
				case 2 : this.client.clockwise(0.5);			break;
				case -2 : this.client.counterClockwise(0.5);	break;
				default : this.client.stop(); 			break;
				}
				switch(this.moving.alt){
				//case 1 : this.client.up(0.25);		break;
				//case -1 : this.client.down(0.25);	break;
				case 2 : this.client.up(0.5);		break;
				case -2 : this.client.down(0.5);	break;
				default : if(this.moving.clockwise==0)this.client.stop(); 		break;
				}
				if(this.moving.forward>0)	this.client.front(0.4*this.moving.forward/100);
				else 						this.client.back(-0.4*this.moving.forward/100);
				if(this.moving.left>0)		this.client.left(0.4*this.moving.left/100);
				else 						this.client.right(-0.4*this.moving.left/100);
			
			}
		}
	}
	
	FlightData.prototype.switchMode = function(){
		if(this.manual){
			this.manual=false;
			socketHandler.send("MODE_AUTO");
			
			this.sequence="LANDING"
			this.client.stop();
			this.client.down(0.2);
			var that=this;
			this.client.on('navdata', function(data){if(data.demo.altitudeMeters<0.4)endLand(that);});
			
			/*this.sequence="SCRIPTED";
			var that = this;
			this.client.land(that.StartTakeOffAuto(that.scriptTest));*/
		}
		else{ 
			if(this.sequence=="STOPPED")this.startTakeOff();
			else console.log(this.sequence);
			}
		
	}
	var endLand = function(that){
		that.client.land();
		that.sequence="STOPPED";		
	}
	
	FlightData.prototype.direction = function(data){
		if(this.manual){
			console.log("{"+data.forward+","+data.left+","+data.alt+","+data.clockwise+"}")
			this.moving=data;
			this.actualise();
		}
	}
	
	module.exports.create = function(cl) {return new FlightData(cl); }
	
}());
