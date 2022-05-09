// Where is the circle
let x, y, speed;

function setup() {
  createCanvas(720, 400);
  // Starts in the middle
  x = width / 2;
  y = height;
  speed = 2;
}

function draw() {
  background(200);
  
  // Draw text
  text('word', x - length, y);
  
  // Moving up at a constant speed
  y = y - speed;
  
  // Reset to the bottom
  if (y < 0) {
    y = height;
  }
}