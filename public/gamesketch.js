const increment = firebase.firestore.FieldValue.increment(1);
let socket= io();
let phase=0;
let timer=0;
let vs1;
let vs2;
let punteggio1 = 0;
let punteggio2 = 0 ;
let winner;
let pasta;
let pastadb = [];
let a = [];
let b = [];
let c;
let i = 0;

socket.on("vs", function getPasta(data1,data2){

  vs1 = data1;
  vs2 = data2;

  pasta.doc(vs1.toString())
    .onSnapshot(function(doc) {
      a = doc.data();
    });

  pasta.doc(vs2.toString())
    .onSnapshot(function(doc) {
      b = doc.data();
    });

});

socket.on('phase0', phase0);
socket.on('phase1', phase1);
socket.on('phase2', phase2);
socket.on("timer", getTimer);
socket.on("scoreBroadcast", updatescore);


function phase0() {phase=0;}
function phase1() {phase=1;}
function phase2() {phase=2;}

function getTimer(data) {timer = data;}




function preload(){}


function setup() {
  createCanvas(windowWidth, windowHeight);
  background('white')

  var firebaseConfig = {
  apiKey: "AIzaSyCgOJASM3a10GY-GpRaDC4wY9ExqsHK-9E",
  authDomain: "tutorial1-fd636.firebaseapp.com",
  projectId: "tutorial1-fd636",
  storageBucket: "tutorial1-fd636.appspot.com",
  messagingSenderId: "361816003225",
  appId: "1:361816003225:web:c224e7125b7e88bdf11e08",
  measurementId: "G-FTQTPYZW2N"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
db = firebase.firestore();

pasta = db.collection("pasta")
pasta.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    pastadb[i] = {
      name: doc.data().name,
      score: doc.data().score
    };
    i++;
  });
})

}


function draw() {
clear()

 console.log('timer: ' + (25- timer))
  if(phase==0){


    fill("black")
    textAlign(CENTER);
    textSize(150);
    text("Sala di attesa",windowWidth/2,windowHeight/4);
    textSize(50);
    text("Mancano "+(4-timer)+" secondi all'inizio del Poll",windowWidth/2,windowHeight/2);


  }


// POLL

if(phase==1 ){
  showrank()

if (punteggio1 > punteggio2) {
  winner = a.name;
} else if (punteggio1 == punteggio2) {
  winner = 'nobody'
} else {
  winner = b.name;
}

textSize(150)
text(20 - timer, windowWidth / 2, 200)
  textSize(50)
    text(a.name + ': ' + punteggio1, windowWidth / 8 * 2, 50)
    text('Totale: ' + a.score, windowWidth / 8 * 2, 100)
    text(b.name + ': ' + punteggio2, windowWidth / 8 * 6 , 50)
    text('Totale: ' + b.score, windowWidth / 8 *6, 100)
    textAlign(CENTER)
    text(winner + ' is winning', windowWidth / 2, 300)
}

  if(phase==2){
    push()
    rectMode(CENTER)
    strokeWeight(5)
    textAlign(CENTER)
    textSize(80)
    fill(255)
    stroke('red')
    rect(windowWidth/2+20,windowHeight/2+20,800,400)
    stroke(0)
    rect(windowWidth/2,windowHeight/2,800,400)
    strokeWeight(0)
    fill(0)
    text(winner + ' won this game', windowWidth/2,windowHeight/2)
    pop()
  }

}

function updatescore(data1, data2) {
  punteggio1 = data1
  punteggio2 = data2
}


function showrank() {
  pastadb.sort(function(c, d) {
    return d.score - c.score;
  });

  for (let i = 1; i < pastadb.length; i++) {
    textSize(30)
    push()
    fill('red')
    textAlign(LEFT);
    pasta.doc(i.toString())
      .onSnapshot(function(doc) {
        pastadb[i] = {
          name: doc.data().name,
          score: doc.data().score
        };
      });
    text(pastadb[i].name + "____" + pastadb[i].score, 50 , 300 + i * 50)
    pop()
  }
}

function mouseClicked() {

  if (mouseX < windowWidth / 2) {
    punteggio1 ++
    socket.emit("mousesx");
    db.collection('pasta').doc(vs1.toString()).update({
      score: increment
    })
  }

    if (mouseX > windowWidth / 2) {
      punteggio2 ++
      socket.emit("mousedx");
      db.collection('pasta').doc(vs2.toString()).update({
        score: increment
      })
    }

}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
