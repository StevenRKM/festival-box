var http = require("http");
//var url = require("url");
var SerialPort = require("serialport").SerialPort;
var exec = require('child_process').exec;

var arduino = new SerialPort("/dev/ttyACM1", {
    baudrate: 9600,
    dataBits: 8, 
    parity: 'none', 
    stopBits: 1, 
    flowControl: false 
});

var arduinoReady = false;

var count = 0;

arduino.on("open", function(){
    console.log('ledcube connected');
    setTimeout(ready , 2000);
});

function ready() {
	arduinoReady = true;
	arduino.on('data', function getData(data) { 
		receivedData = data.toString();
		count++;
		console.log("pling "+count);		
        playSound();
		});

}

function onRequest(request, response) {
  //var pathname = url.parse(request.url).pathname;
  //console.log("url " + request.url);
  
  response.writeHead(200, {"Content-Type": "text/html"});
  if(count==0) {
	response.write("<h1 align=center>Jonge, steek es e kaartje in!</h1>");  
  } else if(count==1) {
	response.write("<h1 align=center>BAM! Das al e kaartje jonge!</h1>");  
  } else {
	response.write("<h1 align=center>Al "+count+" kaartjes jonge!</h1>");  
  }
  response.end();
}

function playSound() {
  exec("aplay audio/37215__simon-lacelle__ba-da-dum.wav -q", function() {console.log("can not play sound")});
}

http.createServer(onRequest).listen(8000);
console.log("server listening on port 8000");
