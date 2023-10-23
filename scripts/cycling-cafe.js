let radius = 80;
let angle = 0;
let speed = 0.03;

// the center of our rotation:
let centerX = 400;
let centerY = 400;

// the center of the 2nd rotation
let centerX2 = 400;
let centerY2 = 400;

// the third rotation
let centerX3 = 400;
let centerY3 = 400;

function setup() { 
  createCanvas(800, 800);
  rectMode(CENTER);
}

function draw() { 

  background(240);

  stroke(0);
  fill(255);
  ellipse(width/2, height/2, 600);
  noStroke();
  // text(angle, 50, 50);
  
  push();
  // translate to point to rotate around
  translate(centerX, centerY);
  rotate (angle);
  // draw shape as though (centerX, centerY) is the new
  // origin / (0, 0) point
  fill(180, 10, 10, 180);
  ellipse(radius-35, radius-35, 450);
  pop();
  
  push();
  // translate around the 2nd point / axis
  translate(centerX2, centerY2);
  rotate (angle);
  fill(10, 10, 180, 150);
  ellipse(radius, radius, 320);
  pop();

  push();
  // translate around the 2nd point / axis
  translate(centerX3, centerY3);
  rotate (angle);
  fill(255,255,0, 130);
  ellipse(radius+30, radius+30, 200);
  pop();
  // make it blurry
  //drawingContext.filter = 'blur(25px)';

  angle = angle + speed;
}