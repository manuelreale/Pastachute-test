// Daniel Shiffman
// http://codingtra.in
// http://patreon.com/codingtrain
// Code for: https://youtu.be/urR596FsU68


function Box(x, y, w, h) {
  var options = {
    friction: 0.5,
    restitution: 0.6
  };
  this.body = Bodies.rectangle(x, y, w, h, options);
  this.w = w;
  this.h = h;
  this.body.angle=random(0,0.1);
  World.add(world, this.body);

  this.show = function() {
    var pos = this.body.position;
    var angle = this.body.angle;
    push();
    translate(pos.x, pos.y);
    rotate(angle);
    rectMode(CENTER);
    strokeWeight(1);
    stroke(255);
    fill(127);
    imageMode(CENTER)
    image(pastaimg[vs2], this.w-60, this.h-16,pastaimg[vs2].width/4,pastaimg[vs2].height/4);
    //rect(0, 0, this.w, this.h);
    pop();
  };

  this.removefromworld = function (){
    World.remove(world, this.body)
  }
}
