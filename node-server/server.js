var http = require("http");
//var url = require("url");
var serialport = require("serialport");
var exec = require('child_process').exec;

var arduino;
var arduinoReady = false;
var arduinoPort = undefined;
var sound = false;

// find the arduino
serialport.list(function (err, ports) {
  ports.forEach(function(port) {
	  if(!arduinoPort) {
			arduinoPort = port.comName;
	  }
	//console.log(port.comName);
	//console.log(port.pnpId);
	//console.log(port.manufacturer);
  });

  connect(arduinoPort);
});

function connect(port) {
	arduino = new serialport.SerialPort(port, {
		baudrate: 9600,
		dataBits: 8,
		parity: 'none',
		stopBits: 1,
		flowControl: false
	});
	arduino.on("open", function(){
		console.log('ledcube connected on '+port);
		setTimeout(ready , 2000);
	});
}

var count = 0;

function ready() {
	arduinoReady = true;
	arduino.on('data', function getData(data) { 
		receivedData = data.toString();
		count++;
		console.log("pling "+count+"    "+(new Date()));		
        playSound();
		});

}

function onRequest(request, response) {
  //var pathname = url.parse(request.url).pathname;
  //console.log("url " + request.url);
  
  if(request.url == '/on') sound = true;
  if(request.url == '/off') sound = false;
  
  response.writeHead(200, {"Content-Type": "text/html"});
  if(count==0) {
	response.write("<h1 align=center>Jonge, steek es e kaartje in!</h1>");  
  } else if(count==1) {
	response.write("<h1 align=center>BAM! Das al e kaartje jonge!</h1>");  
  } else {
	response.write("<h1 align=center>Al "+count+" kaartjes jonge!</h1>");  
  }
  if(sound) {
    response.write("<h4 align=center>Ba dum tssssh!</h4>");  
  } else {
    response.write("<h4 align=center>Still zijn jonge!</h4>");  
  }
  response.end();
}

function playSound() {
    if(sound) {
        exec("aplay audio/37215__simon-lacelle__ba-da-dum.wav -q", function() { /*console.log("can not play sound")*/ });
    }
}

http.createServer(onRequest).listen(9000);
console.log("server listening on port 9000");
