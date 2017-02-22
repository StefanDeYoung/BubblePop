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
      //bubbles[i] = new Bubble(random(width), random(height));
      bubbles[i] = new Bubble(60*i, 60);
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

        //replenishBubbles();

        time = time + 1/fps;
        if (roundLength - round(time) <= 0){gameOver = true;}

    } else {
        drawGameOver();
    }
}

function replenishBubbles(){
    //Add 3 bubbles every tenth of a round
    var addFreq = roundLength/10*fps;

    if (round(time)*fps%round(addFreq) == 0 && !replenished){
            bubbles.push(new Bubble(random(width), random(height)));
    }
}

function mousePressed(){

    for(var i = bubbles.length-1; i >= 0; i--){
        //We're back stepping the array, so that when we remove elements - and thereby change the indices of subsequent entries - we don't accidentally skip over any elements of the array.
        bubbles[i].checkClicked();
    }
}
