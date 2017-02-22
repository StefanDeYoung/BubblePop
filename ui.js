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
