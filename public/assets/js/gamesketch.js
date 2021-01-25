let socket = io();
const increment = firebase.firestore.FieldValue.increment(1);
let phase = 2;
let timer = 0;
let vs1;
let vs2;
let punteggio1 = 0;
let punteggio2 = 0;
let winner;
let pasta;
let a;
let b;
let c;
let nomi = ['Mafaldine', 'Farfalle', 'Cavatappi', 'Casarecce', 'Maltagliati', 'Sedanini', 'Paccheri', 'Penne lisce', 'Ruote', 'Tagliatelle', 'Pipe', 'Ditalini', 'Spaghetti', 'Rigatoni', 'Tortiglioni', 'Mezze maniche', 'Gnocchi', 'Gnocchetti sardi', 'Stelline', 'Ravioli', 'Cappelletti', 'Trofie', 'Orecchiette', 'Fusilli', 'Penne rigate']
let i = 0;
let ric = false;
let pastaList;
let li;
let namerank;
let scorerank;
let statotenda = true;
let users;
let lastwinner;


let pastaimg = [];


//MATTER.JS
// module aliases
var Engine = Matter.Engine,
  // Render = Matter.Render,
  World = Matter.World,
  Bodies = Matter.Bodies;

var engine;
var world;
var boxes = [];
var ground;


//SOCKET
socket.on("vs", function getPasta(data1, data2) {

  vs1 = data1;
  vs2 = data2;


  ric = true;

});

socket.on('phase0', phase0);
socket.on('phase1', phase1);
socket.on('phase2', phase2);
socket.on("timer", getTimer);
socket.on("usercount", usercount)
socket.on("lastwinner", getlastwinner)
socket.on("scoreBroadcast1", updatescore1);
socket.on("scoreBroadcast2", updatescore2);
socket.on('mouseBroadcast', drawOtherMouse);


function phase0() {
  phase = 0;
}

function phase1() {
  phase = 1;
}

function phase2() {
  phase = 2;
}

function getTimer(data) {
  timer = data;
}

function usercount(data){
  users = data
  console.log('utenti: ' +users)
}

function getlastwinner(data){
  lastwinner = data
}





function preload() {
for (var m=0; m<=24; m++) {pastaimg[m] = loadImage("./assets/pasta/Risorsa " + m + ".png");}
bf = loadImage('assets/blackfork.png');
wf = loadImage('assets/whitefork.png');
}


function setup() {
  if(phase == 0){
    let statotenda = false;
  }
  if(phase == 1){
    let statotenda = true;
  }
  if(phase == 2){
    let statotenda = true;
  }
  var cnv =  createCanvas(windowWidth, windowHeight);
  // cnv.id('myCanvas');
  cnv.parent('game-container')
  cnv.style.zIndex = "0"
  background('white')


  //MATTER.JS
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(0, height - windowHeight/35 , windowWidth*10 , 100, options);
  World.add(world, ground);

  var firebaseConfig = {
    apiKey: "AIzaSyB05fGr8baJ4MYGPS0qZDJEHw2ON4Xk6CU",
    authDomain: "pastachutenight.firebaseapp.com",
    projectId: "pastachutenight",
    storageBucket: "pastachutenight.appspot.com",
    messagingSenderId: "103964475619",
    appId: "1:103964475619:web:f62d862db4c21d20f785d6"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  pasta = db.collection("Pasta");

  db.collection("Pasta").orderBy('score','desc').onSnapshot(snapshot => {
      let i=0;
      let changes = snapshot.docChanges();
      changes.forEach(change => {
          //console.log(change.doc.data());
      if(change.type == 'added'){
      console.log('snapshot')
      namerank = document.getElementById('pasta-td-'+i);
      namerank.innerHTML=change.doc.data().name
      scorerank = document.getElementById('score-td-'+i);
      scorerank.innerHTML=change.doc.data().score
            i++
          }
      });
  });
  assegna()


}
let refresh=true;


function drawOtherMouse(data){

imageMode(CENTER);
if(windowWidth<990){
let altrimouse = image(bf, data.x * width, data.y *height, windowWidth/4,windowWidth/4);
}else{
altrimouse = image(bf, data.x * width, data.y * height, windowWidth/10,windowWidth/10);
}
}



function draw() {
  let countdown = document.getElementById('timer');
  let exit = document.getElementById('divstop');
  let utenti = document.getElementById('text-marquee');
  console.log('statotenda: '+ statotenda)
  utenti.innerHTML= "PASTA CHUTE // PASTA CHUTE // PASTA CHUTE " + "  --- USERS ONLINE: " + users + " ---  LIVE NOW:  " + nomi[vs1] + "  vs  " + nomi[vs2] + "  --- LAST WINNER:  " + nomi[lastwinner] + " --- PASTA CHUTE // PASTA CHUTE // PASTA CHUTE "

  clear()


   if (phase == 0) {
     countdown.style.display = 'block';
     exit.style.display = 'block'
     countdown.innerHTML=  7 - timer

    for (var i = 0; i < boxes.length; i++){
      boxes[i].removefromworld()
      boxes.splice(i,1);
    }



    punteggio1 = 0;
    punteggio2 = 0;
    // setTimeout(assegna, 750)
    if(!statotenda){
    console.log("chiamotenda")
    Tenda()
    statotenda = true}

if(windowWidth<990){
imageMode(CENTER)
image(wf, mouseX, mouseY - windowWidth/8, windowWidth/4, windowWidth/4)
}else{
image(wf, mouseX, mouseY - windowWidth/20, windowWidth/10, windowWidth/10);
}
let message = {
  x: mouseX/width,
  y: mouseY/height,
};
socket.emit("mouse", message)
}


  // POLL

  if (phase == 1) {
    countdown.style.display = 'none';
    exit.style.display = 'none'
    // setTimeout(assegna,1000);
    statotenda = false
    clear()

    Engine.update(engine);
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].show();
    }

    if (ric) {
      if (punteggio1 > punteggio2) {
        winner = nomi[vs1];
      } else if (punteggio1 == punteggio2) {
        winner = 'nobody'
      } else {
        winner = nomi[vs2];
      }

      textSize(150)
      text(26 - timer, windowWidth / 2, 200)
      textSize(50)
      text(nomi[vs1] + ': ' + punteggio1, windowWidth / 8 * 2, 50)
      text('Totale: ' + (a + punteggio1), windowWidth / 8 * 2, 100)

      text(nomi[vs2] + ': ' + punteggio2, windowWidth / 8 * 6, 50)
      text('Totale: ' + (b + punteggio2), windowWidth / 8 * 6, 100)

      textAlign(CENTER)
      text(winner + ' is winning', windowWidth / 2, 300)
    }
  }

  if (phase == 2) {
    countdown.style.display = 'none';
    exit.style.display = 'none'
    ric = false;
    push()
    rectMode(CENTER)
    strokeWeight(5)
    textAlign(CENTER)
    textSize(50)
    fill(255)
    stroke('red')
    rect(windowWidth / 2 + 20, windowHeight / 2 + 20, windowWidth / 7 * 5, windowHeight / 3)
    stroke(0)
    rect(windowWidth / 2, windowHeight / 2, windowWidth / 7 * 5, windowHeight / 3)
    strokeWeight(0)
    fill(0)
    text(nomi[lastwinner] + ' won this game', windowWidth / 2, windowHeight / 2)
    pop()
    statotenda = false

  }

}

function assegna() {
  pasta.doc(vs1.toString()).get().then(function(doc) {
    a = doc.data().score;
  })

  pasta.doc(vs2.toString()).get().then(function(doc) {
    b = doc.data().score;
  })
}

function updatescore1(data1) {
  punteggio1 = data1
  boxes.push(new Box1(random(0, windowWidth/2), 0, 60,17));
}

function updatescore2(data1) {
  boxes.push(new Box(random(windowWidth/2, windowWidth), 0,60,17));
  punteggio2 = data1
}





function mouseClicked() {
  if (mouseX < windowWidth / 2) {
    punteggio1++
    boxes.push(new Box1(mouseX, mouseY, 60,17));
    socket.emit("mousesx");
    db.collection('Pasta').doc(vs1.toString()).update({
      score: increment
    })
  }

  if (mouseX > windowWidth / 2) {
    punteggio2++
    boxes.push(new Box(mouseX, mouseY,60,17));
    socket.emit("mousedx");
    db.collection('Pasta').doc(vs2.toString()).update({
      score: increment
    })
  }
updateRank()
}

function updateRank(){
db.collection("Pasta").orderBy('score','desc').onSnapshot(snapshot => {
let i=0;
      let changes = snapshot.docChanges();
      changes.forEach(change => {
          //console.log(change.doc.data());
          if(change.type == 'added'){
            namerank = document.getElementById('pasta-td-'+i);
            namerank.innerHTML=change.doc.data().name
            scorerank = document.getElementById('score-td-'+i);
            scorerank.innerHTML=change.doc.data().score

            // pastaList = document.getElementById('pasta-list');
            i++
          }
      });
  });

}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
