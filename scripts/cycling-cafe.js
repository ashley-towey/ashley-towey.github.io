// function setup() {
//     createCanvas(800, 800);
// }

// function draw() {
//     background(200);
//     noStroke();
//     fill(180, 10, 10, 180);
//     ellipse(windowWidth/2-50, windowHeight/2-50, 400);
//     fill(10, 10, 180, 150);
//     ellipse(windowWidth/2, windowHeight/2, 200);
// }

let radius = 80;
let angle = 0;
let speed = 0.03;

// the center of our rotation:
let centerX = 300;
let centerY = 300;

// the center of the 2nd rotation
let centerX2 = -30;
let centerY2 = 50;

// the third rotation
let centerX3 = -10;
let centerY3 = 20;

function setup() { 
  createCanvas(600, 600);
  rectMode(CENTER);
}

function draw() { 
  background(220);
  noStroke();
  // text(angle, 50, 50);
  
  // translate to point to rotate around
  translate(centerX, centerY);
  rotate (angle);
  // draw shape as though (centerX, centerY) is the new
  // origin / (0, 0) point
  fill(180, 10, 10, 180);
  ellipse(radius-50, radius-30, 400);

  // translate around the 2nd point / axis
  translate(centerX2, centerY2);
  fill(10, 10, 180, 150);
  ellipse(radius-50, radius-50, 300);

  // translate around the 2nd point / axis
  translate(centerX3, centerY3);
  fill(255,255,0, 130);
  ellipse(radius-50, radius-30, 200);
  
  angle = angle + speed;
}