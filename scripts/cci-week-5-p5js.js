/*let xPos = 5;
let xStep = 15;

function setup() {
    createCanvas(windowWidth, windowHeight);
    rectMode(CENTER);

}

function draw() {
    background(200);

    for(let i = 0; i < width/xStep; i++){
        factor = i/10;
        let yPos = map(noise(factor), 0, 1, 0, height); // use perlin noise for the y value
        // rect(xPos+(xStep*i), yPos, xStep, xStep); // draw the rectangle
        line (i, yPos, i, height);

    }
}
*/
/*
let noiseScale=0.02;

function draw() {
  background(0);
  for (let x=0; x < width; x++) {
    let noiseVal = noise((mouseX+x)*noiseScale, mouseY*noiseScale);
    stroke(noiseVal*255);
    line(x, mouseY+noiseVal*80, x, height);
  }
  /* describe(`horizontal wave pattern effected by mouse x-position
    & updating noise values.`); 
} */
let gX = [];
let gY = [];

circleMove = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
  }
  
  function draw() {
    background(0);
    // noFill();
    stroke(200);
  
    /*
    beginShape();
    for (var x = 0; x < width; x++) {
      var nx = map(x, 0, width, 0, 1);
      var y = height * noise(nx);
      vertex(x, y);

    }
    endShape();
    */

    for (let i = 0; i < width; i++) {
        fill(255, 0, 0);
        ellipse(i, 50, 50);
    }

  }
