let radius = 80;
let angle = 0;
let speed = 0.03;

// the center of our rotation:
let centerX = 300;
let centerY = 350;

// the center of the 2nd rotation
let centerX2 = 370;
let centerY2 = 350;

// the third rotation
let centerX3 = 270;
let centerY3 = 350;

function setup() { 
  createCanvas(800, 800);
  rectMode(CENTER);
}

function draw() { 
  background(255);
  noStroke();
  // text(angle, 50, 50);
  
  push();
  // translate to point to rotate around
  translate(centerX, centerY);
  rotate (angle);
  // draw shape as though (centerX, centerY) is the new
  // origin / (0, 0) point
  fill(180, 10, 10, 180);
  ellipse(radius-50, radius-30, 400);
  pop();
  
  push();
  // translate around the 2nd point / axis
  translate(centerX2, centerY2);
  rotate (angle);
  fill(10, 10, 180, 150);
  ellipse(radius+30, radius+30, 300);
  pop();
  push();
  // translate around the 2nd point / axis
  translate(centerX3, centerY3);
  rotate (angle);
  fill(255,255,0, 130);
  ellipse(radius-20, radius-20, 200);
  pop();
  // make it blurry
  drawingContext.filter = 'blur(10px)';

  angle = angle + speed;
}