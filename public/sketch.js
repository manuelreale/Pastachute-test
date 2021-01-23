let socket= io();
let phase=0;
let timer=0;
let vs1;
let vs2;

const urlString = window.location.href;
const url = new URL(urlString);

socket.on('connect', newConnection);

socket.on('phase0', phase0);
socket.on('phase1', phase1);
socket.on('phase2', phase2);
socket.on("timer", setTimer);
socket.on("vs", getPasta);


function phase0(){ phase=0; }
function phase1(){ phase=1; }
function phase2(){ phase=2; }

function setTimer(data) {timer = data;}

function getPasta(a,b){
  vs1 = a;
  vs2 = b;
}

function newConnection(){
  // console.log('your id: '+socket.id);
}

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

  vs1 = floor(random(1, pastadb.length))
  vs2 = floor(random(1, pastadb.length))

  console.log(vs1)

  if (vs2 == vs1) {
  vs2 = floor(random(1, pastadb.length))
  }
  console.log(vs2)

 if(vs2 != vs1){
  pasta.doc(vs1.toString())
    .onSnapshot(function(doc) {
      a = doc.data();
    });

  pasta.doc(vs2.toString())
    .onSnapshot(function(doc) {
      b = doc.data();
    });

  ric = true
  }

});
}

function draw() {

  background("white")
  rectMode(CENTER)

  if(phase==0){
    fill("white")
    rect(windowWidth/2,windowHeight/2,300,100)
    fill("black")
    textAlign(CENTER);
    textSize(50);
    text("Entra",windowWidth/2,windowHeight/2);
  }

  if(phase==1){
    fill("white")
    rect(windowWidth/2,windowHeight/2,300,100)
    fill("grey")
    textAlign(CENTER);
    textSize(50);
    text("Entra tra " +(25-timer),windowWidth/2,windowHeight/2);
  }

  if(phase==2){
    fill("white")
    rect(windowWidth/2,windowHeight/2,300,100)
    fill("grey")
    textAlign(CENTER);
    textSize(50);
    text("Entra tra " +(25-timer),windowWidth/2,windowHeight/2);
  }

  if(mouseIsPressed && phase==0){ //on mouse click when phase==0 open poll
    window.open(url.origin + "/gameindex.html")
  }

}
