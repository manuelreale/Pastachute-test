let socket= io();
let phase=0;
let timer=0;



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



function setup() {
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



  function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
  }
