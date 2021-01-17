const pastalist = document.querySelector('#cafe-list')
const increment = firebase.firestore.FieldValue.increment(1);
let socket = io();
socket.on("mousedxBroadcast", clickdx);
socket.on("mousesxBroadcast", clicksx);
let penne= db.collection('pasta').doc('penne')


let winner;
let punteggiopenne = 0;
let punteggiospaghetti = 0;
let timer = 5;



function setup (){
let c = createCanvas(windowWidth,250)
c.position(0,0)
setInterval(timerdown, 1000)
}




function renderpasta(doc){
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

function draw(){
background('yellow')
textSize(50)
text(timer, windowWidth/7*3,50)
text( 'Penne: ' +  punteggiopenne, windowWidth/7*5,50)
text('Spaghetti: ' + punteggiospaghetti, windowWidth/7*1,50)

if(punteggiopenne > punteggiospaghetti){
  winner = 'Penne';
}
else{
  winner = 'Spaghetti';
}

if(timer <1){
timer = 0;
text(winner + ' wins',windowWidth/7*3,150)
}
}


function clickdx(){
punteggiopenne+=1
}

function clicksx(){
punteggiospaghetti+=1
}

function timerdown(){
  if(timer <1){
  timer = 0;
  }
  else{
  timer -=1}
}


function mouseClicked(){
  console.log(penne)
if(mouseX > windowWidth/2){
  socket.emit("mousedx");
  punteggiopenne +=1
  db.collection('pasta').doc('penne').update({
  punteggio: increment
})}
if(mouseX < windowWidth/2){
  socket.emit("mousesx");
  punteggiospaghetti +=1
  db.collection('pasta').doc('spaghetti').update({
  punteggio: increment
})}

}
