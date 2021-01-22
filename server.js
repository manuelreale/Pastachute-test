// load express library
let express = require("express");
// create the app
let app = express();
// define the port where client files will be provided
let port = process.env.PORT || 3000;
// start to listen to that port
let server = app.listen(port);
// provide static access to the files
// in the "public" folder
app.use(express.static("public"));
// load socket library
let socket = require("socket.io");
// create a socket connection
let io = socket(server);
// define which function should be called
// when a new connection is opened from client
io.on("connection", newConnection);
// callback function: the paramenter (in this case socket)
// will contain all the information on the new connection


let phase = 0;
let timer = 0;
let vs1 = 1
let vs2 = Math.floor(Math.random() * 6)

let punteggio1 = 0;
let punteggio2 = 0;

function newConnection(socket){

  setInterval(function(){ phasef(); }, 100); //run phasef every sec

  function phasef(){
    socket.emit("timer", timer); //send timer
    socket.emit("vs",vs1,vs2);
    socket.emit("scoreBroadcast", punteggio1, punteggio2) //send 2 pasta type
    socket.emit("phase"+phase); //send phase
  }

socket.on("mousedx", mouseMessagedx);
socket.on("mousesx", mouseMessagesx);

 function mouseMessagedx() {
   punteggio2++
 }

 function mouseMessagesx() {
  punteggio1++
 }

}


setInterval(function(){
  console.log(timer, phase);
  timer++; //update timer every sec
  if (timer <= 4) {phase = 0; }
  if (timer > 4 && timer <= 19) {phase = 1;}
  if (timer > 19 && timer < 24) {phase = 2;}
  if (timer > 24) {phase = 0; timer = 0; getRandomNumber(); punteggio1 = 0; punteggio2 = 0;} //get a random value for vs2
}, 1000);


function getRandomNumber() {
  var number = Math.floor(Math.random() * 7)
  if(number != vs1 && number != vs2){
  if(punteggio1 > punteggio2){
  vs2 = number; }
  if(punteggio1 < punteggio2){
  vs1 = vs2
  vs2 = number;}}
  else {
  vs2 = Math.floor(Math.random() * 7)
  }
}
