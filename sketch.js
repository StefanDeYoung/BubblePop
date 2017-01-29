/* 
Bubble Pop
Stefan De Young
13,14 January 2017
with help from The Coding Train on Youtube

    - Create a number (startNBubbles) of bubbles on the screen.
    - Delete bubbles when they are clicked on    
    - Bubbles become redder over time
        - At maximum redness, bubbles are deleted
    - Bubbles start green, you get points if you kill it when it's greener    
*/

var bubbles=[];
var startNBubbles = 5;
var scoreDisplay;
var score = 0;
var fps = 60;
var time = 0;
var roundLength = 30;
var gameOver = false;
var replenished = false;

function setup() {
    //Create a canvas inside of <div id="canvas-holder">
    var canv = createCanvas(1000, 300);
    canv.parent("canvas-holder");
    
    //Drawing parameters
    ellipseMode(RADIUS);    
    frameRate(fps);     //Default is 60fps
        
    //Create Objects
    for(var i=0; i < startNBubbles; i++){
      bubbles[i] = new Bubble();
    }	
}

function draw() {
    if(!gameOver){
        
        background(150);
        drawScoreBoard();                

         for(var i = bubbles.length-1; i >= 0; i--){
            bubbles[i].update();
            bubbles[i].display();
            if (bubbles[i].kill){
                score += floor(bubbles[i].life/25)-1;
                bubbles.splice(i,1);
            }
        }
        
        replenishBubbles();

        time = time + 1/fps;
        if (roundLength - round(time) <= 0){gameOver = true;}
        
    } else {
        drawGameOver();
    }
    
function drawScoreBoard(){
    textSize(20);
    fill(0);
    text("score", 10, 30);
    text(score, 10+20, 50);
    text("time",10+60, 30);
    text(roundLength - round(time),10+73, 50);
}
    
function drawGameOver(){
    background(50);
    fill(255);
    textSize(32);
    text("GAME OVER!", width/2 - 100, height/2);
    
    textSize(20);
    text("SCORE: " + score, width/2 + 60 - 100, height/2 + 30);
}
    
function replenishBubbles(){
    //Add 3 bubbles every tenth of a round
    var addFreq = roundLength/10*fps;
    
    if (round(time)*fps%round(addFreq) == 0 && !replenished){        
            bubbles.push(new Bubble);            
    }
}
    
}

function Bubble(x,y){
//Constructor functions are capitalised
    
    if (x>0 && x < width){
        this.x = x;
    } else { 
        this.x = random(width/5,width-width/5);
    }
    
    if (y>0 && y<height){
        this.y = y;    
    } else {
        this.y = random(height/5, height - height/5);    
    }    
    
    this.radius = height/10;
    this.count = 0;
    
    this.red = 0;
    this.green = 0;
    this.life = 255;
    
    this.changeColor = function(){
        this.green = 0 + this.life;
        this.red = 255 - this.life;
    }
    
    this.display = function(){    
        fill(this.red, this.green, 0);
        ellipse(this.x,this.y,this.radius);
    }
	
	this.kill = false;        
        
    this.checkClicked = function(){
        var d = dist(mouseX,mouseY,this.x,this.y);
        
        if (d < this.radius){
            this.kill = true;
        }
    }

    this.xSpeed = random(-2,2);
    this.ySpeed = random(-2,2);
    
    this.move = function(style){    
        
        switch(style){
            case "jitter":
                this.x += random(-1,1);
                this.y += random(-1,1);
                
                break;
            case "bounce":                       
                if (this.x >= width || this.x <= 0){
                    this.xSpeed = this.xSpeed*-1;}
                if (this.y >= height || this.y <= 0){
                    this.ySpeed = this.ySpeed*-1;}
                
                this.x += this.xSpeed;
                this.y += this.ySpeed;
                
                break;
            default:
                break; //no movement
        }
    }
    
    this.update = function(){
        //handles animation and change in state
        
        this.move("bounce");
                
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
}

function mousePressed(){
    
    for(var i = bubbles.length-1; i >= 0; i--){
        //We're back stepping the array, so that when we remove elements - and thereby change the indices of subsequent entries - we don't accidentally skip over any elements of the array.        
        bubbles[i].checkClicked();
    }
}
