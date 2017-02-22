function Bubble(x,y){
//Constructor functions are capitalised

  this.pos = createVector(x,y);
  this.vel = createVector();
  this.acc = createVector();

  this.radius = height/10;
  this.count = 0;

  this.red = 0;
  this.green = 0;
  this.life = 255;

  this.kill = false;
}

Bubble.prototype.changeColor = function(){
  this.green = 0 + this.life;
  this.red = 255 - this.life;
}

Bubble.prototype.display = function(){
  fill(this.red, this.green, 0);
  ellipse(this.pos.x,this.pos.y,this.radius);
}

Bubble.prototype.checkClicked = function(){
  var d = dist(mouseX,mouseY,this.pos.x,this.pos.y);

  if (d < this.radius){
      this.kill = true;
  }
}

Bubble.prototype.move = function(style){

  switch(style){
      case "jitter":
          var jitter = 100;
          this.vel = (random(-1*jitter, jitter), random(-1*jitter, jitter));
          break;

      case "bounce":
          if (this.pos.x >= width || this.pos.x <= 0){
              this.vel.x = this.vel.x*-1;
          }
          if (this.pos.y >= height || this.pos.y <= 0){
              this.vel.y = this.vel.y*-1;
          }
          break;

      case "snake":
        if (this.count == 0){
          this.vel.set(5, 0);
        }

        if (this.pos.x >= width || this.pos.x <=0){
          this.vel.mult(-1);
          this.pos.y += this.radius;
        }
      default:
          break; //no movement
  }

  this.pos.add(this.vel);
}

Bubble.prototype.update = function(){
  //handles animation and change in state

  this.move("snake");

  //objects redden as they live
  this.life--;
  this.changeColor();

  //make the bubbles shrink as they are on screen longer
  if (this.count == 6){
          if (this.radius>=0){
              this.radius --;
          } else {
              this.kill = true;
          }
          this.count = 0;
      } else{
          this.count++;
      }
}
