console.log('node is running')

let express = require("express");

let socket = require("socket.io");

let app = express();

let port = process.env.PORT || 3000; //port given by heroku or local

let server = app.listen(port);

app.use(express.static("public"));

let io = socket(server)

io.on('connection', newConnection);

let phase = 0;
let timer = 0;

let vs1 = Math.floor(Math.random() * 7)
let vs2 = Math.floor(Math.random() * 7)

while(vs2 == vs1){
vs2 =  Math.floor(Math.random() * 7)
}

let punteggio1 = 0;
let punteggio2 = 0;

function newConnection(socket){

  setInterval(function(){ phasef(); }, 100); //run phasef every sec

  function phasef(){
    socket.emit("timer", timer); //send timer
    socket.emit("vs",vs1,vs2);


    socket.emit("phase"+phase); //send phase
  }

socket.on("mousedx", mouseMessagedx);
socket.on("mousesx", mouseMessagesx);

 function mouseMessagedx() {
  punteggio2++
  socket.broadcast.emit("scoreBroadcast2", punteggio2) //send 2 pasta type
 }

 function mouseMessagesx() {
  punteggio1++
  socket.broadcast.emit("scoreBroadcast1", punteggio1)
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
  while(number == vs1 || number == vs2){
  number = Math.floor(Math.random() * 7);}

  if(punteggio1 > punteggio2){
  vs1 = vs1;
  vs2 = number; }

  if(punteggio1 < punteggio2){
  vs1 = vs2
  vs2 = number;}

}
