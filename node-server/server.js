var http = require("http");
//var url = require("url");
var SerialPort = require("serialport").SerialPort;
var exec = require('child_process').exec;

/*
var arduino = new SerialPort("/dev/ttyACM0", {
    baudrate: 9600,
    dataBits: 8, 
    parity: 'none', 
    stopBits: 1, 
    flowControl: false 
});

var arduinoReady = false;

arduino.on("open", function(){
    console.log('ledcube connected');
    setTimeout(ready , 2000);
});
*/
function ready() {
	arduinoReady = true;
	arduino.on('data', function getData(data) { 
		receivedData = data.toString();
		console.log(receivedData);
        playSound();
		});

}

function onRequest(request, response) {
  //var pathname = url.parse(request.url).pathname;
  console.log("url " + request.url);
  
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("request should contain 64 bits, now contains "+bits.length);
  
  response.end();
}

function playSound() {
  exec("aplay audio/37215__simon-lacelle__ba-da-dum.wav -q", function() {console.log("can not play sound")});
}

http.createServer(onRequest).listen(8000);
console.log("server listening on port 8000");
