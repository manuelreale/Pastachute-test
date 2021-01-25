function openAbout() {
  document.getElementById("about-overlay").style.width = "100%";
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeAbout() {
  document.getElementById("about-overlay").style.width = "0%";
  console.log('chiudi')
}

function openRan() {
  document.getElementById("ranking-overlay").style.left = "0px";
  console.log('non mi vedi')
}

/* Close when someone clicks on the "x" symbol inside the overlay */
function closeRan() {
  document.getElementById("ranking-overlay").style.left = "100%";
  console.log('chiudimi');

}

function showCredits(){
 credits =  document.getElementById('credits');
 troppoitaliano = document.getElementById("troppo-italiano");
 // pagina = document.getElementById("about-overlay");


if (credits.style.display === 'block') {
   credits.style.display = 'none';
   troppoitaliano.style.animationPlayState = "running";
   troppoitaliano.style.transform = "rotate(0deg)";
 }
else {
   credits.style.display ='block';
   troppoitaliano.style.animationPlayState= "paused";
   troppoitaliano.style.transform = "rotate(-30deg)";
   }

   // troppoitaliano.mouseOver(function () {
   //   troppoitaliano.style.transform = "rotate(-30deg)";
   // }
}
