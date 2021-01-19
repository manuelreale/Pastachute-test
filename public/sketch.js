const pastalist = document.querySelector('#cafe-list')
const increment = firebase.firestore.FieldValue.increment(1);
let socket = io();
socket.on("mousedxBroadcast", clickdx);
socket.on("mousesxBroadcast", clicksx);

let winner;
let punteggiopenne = 0;
let punteggiospaghetti = 0;
let timer = 5;
let scorespaghetti = []
let scorepenne = [];



function setup() {
  let c = createCanvas(windowWidth, 250)
  c.position(0, 0)
  setInterval(timerdown, 1000)
    textAlign(CENTER)
}




function renderpasta(doc) {
  let li = document.createElement('li');
  let name = document.createElement('span');
  let punteggio = document.createElement('span');

  li.setAttribute('data-id', doc.id);
  name.textContent = doc.data().name;
  punteggio.textContent = doc.data().punteggio;


  li.appendChild(name);
  li.appendChild(punteggio);
  pastalist.appendChild(li);
}

function draw() {
  background('white')
  textSize(50)
  text(timer, windowWidth /2, 50)
  text('Penne: ' + punteggiopenne, windowWidth / 7 * 5, 50)
  text('Totale:' + scorepenne.punteggio, windowWidth / 7 * 5, 100)
  text('Totale:' + scorespaghetti.punteggio, windowWidth / 7 * 2, 100)
  text('Spaghetti: ' + punteggiospaghetti, windowWidth / 7 * 2, 50)

  text(winner + ' is winning', windowWidth /2, 175)

  db.collection("pasta").doc("penne")
    .onSnapshot(function(doc) {
      scorepenne = doc.data();
    });

  db.collection("pasta").doc("spaghetti")
    .onSnapshot(function(doc) {
      scorespaghetti = doc.data();
    });

  if (punteggiopenne > punteggiospaghetti) {
    winner = 'Penne';
  }
  else if(punteggiopenne == punteggiospaghetti){
    winner = 'nobody'
  }
    else{
    winner = 'Spaghetti';
  }

  if (timer < 1) {
    timer = 0;
  }
}


function clickdx() {
  punteggiopenne += 1
}

function clicksx() {
  punteggiospaghetti += 1
}

function timerdown() {
  if (timer < 1) {
    timer = 0;
  } else {
    timer -= 1
  }
}


function mouseClicked() {
  if(timer!=0){
  if (mouseX > windowWidth / 2) {
    socket.emit("mousedx");
    punteggiopenne += 1
    db.collection('pasta').doc('penne').update({
      punteggio: increment
    })
  }
  if (mouseX < windowWidth / 2) {
    socket.emit("mousesx");
    punteggiospaghetti += 1
    db.collection('pasta').doc('spaghetti').update({
      punteggio: increment
    })
  }}

}
