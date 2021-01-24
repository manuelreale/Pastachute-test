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
let pastadb = [];
let a;
let b;
let c;
let nomi = ['Tagliatelle', 'Penne rigate', 'Spaghetti', 'Lasagne', 'Mezze maniche', 'Capellini', 'Gnocchi sardi', 'Orecchiete', 'Fusilli']
let i = 0;
let ric = false;
let pastaList;
let li;
let namerank;
let scorerank;
let statotenda = true;


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
socket.on("scoreBroadcast1", updatescore1);
socket.on("scoreBroadcast2", updatescore2);


function phase0() {
  phase = 0;
    //Tenda()
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




function preload() {
for (var m=0; m<=7; m++) {pastaimg[m] = loadImage("./assets/pasta/Risorsa " + m + ".png");}
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
  cnv.id('myCanvas');
  background('white')

  //MATTER.JS
  engine = Engine.create();
  world = engine.world;
  //Engine.run(engine);
  var options = {
    isStatic: true
  };
  ground = Bodies.rectangle(0, height, windowWidth*10 , 100, options);
  World.add(world, ground);

  var firebaseConfig = {
    apiKey: "AIzaSyDtkQChaipjNwxzQHFQ7FqJgNR2YZf9C-4",
    authDomain: "pastachute-2.firebaseapp.com",
    projectId: "pastachute-2",
    storageBucket: "pastachute-2.appspot.com",
    messagingSenderId: "443070626446",
    appId: "1:443070626446:web:7d8c20c910933378af27df"
  };

  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  db = firebase.firestore();
  db.settings({ timestampsInSnapshots: true });
  pasta = db.collection("Pasta");


  // pasta.get().then((querySnapshot) => {
  //   querySnapshot.forEach((doc) => {
  //     pastadb[i] = {
  //       name: doc.data().name,
  //       score: doc.data().score
  //     };
  //     i++;
  //   });
  // })



  db.collection("Pasta").orderBy('score','desc').onSnapshot(snapshot => {
      let i=0;
      let changes = snapshot.docChanges();
      changes.forEach(change => {
          //console.log(change.doc.data());
          if(change.type == 'added'){
            lol= document.getElementById('pasta-li-'+i);
            lol.innerHTML=change.doc.data().name+": "+change.doc.data().score;
            pastaList = document.getElementById('pasta-list');
            li = document.createElement('li');
            namerank  = document.createElement('span');
            scorerank = document.createElement('span');
            i++
            // showrank(change.doc);
          }
      });
  });


}
let refresh=true;

function draw() {

  if(timer==18){
    refresh=false;
  }

  if(timer==19 && !refresh){
    setTimeout(function(){
      window.open("./index.html","_self");
      let refresh=true;
    },800)
  }
  //console.log('stato tenda: ' +statotenda)
  clear()
  // pastadb.sort(function(c, d) {
  //   return c.score - d.score;
  // });

  if (phase == 0) {
    for (var i = 0; i < boxes.length; i++) {
      boxes.splice(i,1);
    }
    punteggio1 = 0;
    punteggio2 = 0;
    setTimeout(assegna, 750)
    // background('white')
    // fill("black")
    // textAlign(CENTER);
    // textSize(150);
    // text("Sala di attesa", windowWidth / 2, windowHeight / 4);
    // textSize(50);
    // text("Mancano " + (4 - timer) + " secondi all'inizio del Poll", windowWidth / 2, windowHeight / 2);

    if(!statotenda){
    console.log("chiamotenda")
     Tenda()
    statotenda = true}
  }


  // POLL

  if (phase == 1) {
    setInterval(assegna,1000);
    statotenda = false
    clear()

    Engine.update(engine);
    for (var i = 0; i < boxes.length; i++) {
      boxes[i].show();
    }
    push()
    noStroke(255);
    fill('red');
    rectMode(LEFT);
    rect(0, ground.position.y - 60, windowWidth, 100);
    pop()
    // console.log('timer: ' + (25 - timer))

    if (ric) {
      if (punteggio1 > punteggio2) {
        winner = nomi[vs1];
      } else if (punteggio1 == punteggio2) {
        winner = 'nobody'
      } else {
        winner = nomi[vs2];
      }

      textSize(150)
      text(20 - timer, windowWidth / 2, 200)
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
    text(winner + ' won this game', windowWidth / 2, windowHeight / 2)
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
assegna();
}

function updateRank(){
  //let scorelistings = getElementsByTagName("li")
  // for(var i=0; i<scorelistings.length;i++){
  //   scorelistings[i].remove
  // }

  db.collection("Pasta").orderBy('score','desc').onSnapshot(snapshot => {
let i=0;
      let changes = snapshot.docChanges();
      changes.forEach(change => {
          //console.log(change.doc.data());
          if(change.type == 'added'){
            lol= document.getElementById('pasta-li-'+i);
            lol.innerHTML=change.doc.data().name+": "+change.doc.data().score;
            pastaList = document.getElementById('pasta-list');
            li = document.createElement('li');
            namerank  = document.createElement('span');
            scorerank = document.createElement('span');
            i++
            // showrank(change.doc);
          }
      });
  });

}

function showrank(doc) {
// lol= document.getElementById('pasta-li-'+i);
// lol.innerHTML=5;
//   namerank.innerHTML = doc.data().name;
//   scorerank.innerHTML = doc.data().score;
//
//    li.appendChild(namerank);
//    li.appendChild(scorerank);
//    li.class='scorelisting'
//    pastaList.appendChild(li);
//
//

  //
  //
  // for (let t = 0; t < pastadb.length; t++) {
  //   pasta.doc(t.toString())
  //     .onSnapshot(function(doc) {
  //       pastadb[t] = {
  //         name: doc.data().name,
  //         score: doc.data().score
  //       };
  //     });
  //     textSize(30)
  //     push()
  //     fill('red')
  //     textAlign(LEFT);
  //     text(pastadb[t].name + "____" + pastadb[t].score, 50, 300 + t * 50)
  //     pop()
  // }


}


function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
