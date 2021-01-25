let socket= io();
let phase=0;
let timer=0;

var waitingRoomContainer;
var ready = false;
var pasta = [];
var score = 0;


var colanderX;
var colanderY;
var colanderW;
var colanderH;
let pastaimgs = [];

const urlString = window.location.href;
const url = new URL(urlString);



socket.on('phase0', phase0);
socket.on('phase1', phase1);
socket.on('phase2', phase2);
socket.on("timer", setTimer);



function phase0(){ phase=0; }
function phase1(){ phase=1; }
function phase2(){ phase=2; }

function setTimer(data) {timer = data;}



function preload(){
  for (var t=1; t<23; t++) {
  pastaimgs[t] = loadImage("./assets/img/pasta/pasta-"+ t +".png");
}
  colander = loadImage("./assets/img/colander.png")

}


function setup() {

  waitingRoomContainer = select("#waiting-room-container");
  waitingRoomContainer.hide();
  for(var i = 1; i<5; i++) { pasta[i] = new pastaRain() }

  let gameCnv = createCanvas(windowWidth, windowHeight)
  gameCnv.parent(waitingRoomContainer);
  gameCnv.position(0, 0);
  gameCnv.style.zIndex = "150";

  var firebaseConfig = {
    apiKey: "AIzaSyDScoKt2ZZSpZxy7gikG5RgCUM_x837BBI",
    authDomain: "pastachutedraw.firebaseapp.com",
    projectId: "pastachutedraw",
    storageBucket: "pastachutedraw.appspot.com",
    messagingSenderId: "529526462285",
    appId: "1:529526462285:web:9b46b9ca57c23363668904"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });

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

}

function draw() {
clear()
// UPDATES THE TIMER
select("#waiting-room-timer").html(27 - timer);
if(27-timer< 0){
select("#waiting-room-timer").html(0);
}

// THE USER IS READY TO PLAY
select("#play-btn").mouseClicked(function () {
  ready = true;

})

select("#skip-btn").mouseClicked(function () {
  ready = true;
  select("#title").removeAttribute("style")
  select("#animated-background").hide()
})

if (ready==true) {
  openPoll()
}

// TOGGLES THE FUNCTIONS TO CREATE PASTA
for (let s=1; s<5; s++) {
pasta[s].show();
pasta[s].update();
}

// DISPLAYS THE SCORE
select("#score").html("SCORE: " + score)

// COLANDER
colanderW = windowWidth/6;
colanderH = windowWidth/16;
colanderX = constrain(mouseX, colanderW/2, windowWidth-colanderW/2);
colanderY = height - colanderH/2 - windowHeight/12;

imageMode(CENTER)

image(colander, colanderX, colanderY, colanderW, colanderH);

  // if(timer==25){ //on mouse click when phase==0 open poll
  //   window.open(url.origin + "/gameindex.html")
  // }

}




  function pastaRain() {

  this.x = random(0, windowWidth);
  this.y = random(-10, -windowHeight);
  this.img = pastaimgs[3];

  // CREATES PIECES OF PASTA
    this.show = function() {
    // let pastaW = (cnvW/18);
    // let pastaH = (cnvW/18);

   image(this.img, this.x, this.y);
    }

  // MAKES PASTA FALL
    this.update = function() {
      this.speed = random(5, 10);
      this.gravity = 1.05;
      this.y = this.y + this.speed*this.gravity;

    if (this.y > windowHeight) {
    this.y = random(0, -windowHeight);
    this.x = random(0, windowWidth)
    this.gravity = 0;
    }

  // MAKES PASTA DISAPPEAR IF CAUGHT WITH THE COLANDER
  colanderW = windowWidth/8;
  colanderH = windowHeight/8;
  colanderX = constrain(mouseX, colanderW/2, windowWidth-colanderW/2);
  colanderY = height - colanderH - windowHeight/12;

    if (this.y > colanderY && this.x >= (colanderX - colanderW/2) && this.x <= (colanderX + colanderW))
    {
      this.y = 0;
      this.x = random(0, windowWidth)

      if (ready == true) {
      score++;
    }
  }
  }
  }


  // OPEN POLL
  function openPoll () {
// if a match is in progress, it display the mini-game

  if (timer<25) {
  select("#play-btn").hide();
  select("#skip-btn").hide();
  select("#scroll").hide();
  select("#home-text-content").hide();
  waitingRoomContainer.show();
  waitingRoomContainer.style.display = "block";
  waitingRoomContainer.addClass('activated')
  select("#waiting-room-text").addClass("activated")
  select("#score").addClass("activated")
  }
  // if the match is over, it opens the poll
  else {window.open("game.html", "_self")}
  }

  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
