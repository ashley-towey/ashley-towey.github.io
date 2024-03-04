// Path Following (Complex Path)
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/LrnR6dc2IfM
// https://thecodingtrain.com/learning/nature-of-code/5.7-path-following.html

// Path Following: https://editor.p5js.org/codingtrain/sketches/dqM054vBV
// Complex Path: https://editor.p5js.org/codingtrain/sketches/2FFzvxwVt

// Crowd Path Following
// Via Reynolds: http://www.red3d.com/cwr/steer/CrowdPath.html

// Using this variable to decide whether to draw all the stuff
let debug = false;

// A path object (series of connected points)
let path;

// Two vehicles
let vehicles = [];

// time variables 
let m;
let h;
let s;
let font;

function preload() {
  font = loadFont('../data/PPSupplySans-Regular.otf');
}

function setup() {
  createCanvas(800, 600);

  textFont(font);

  // Call a function to generate new Path object
  newPath();

  // We are now making random vehicles and storing them in an ArrayList
  for (let i = 0; i < 25; i++) {
    newVehicle(random(width), random(height));
  }
//   createP(
//     "Hit 'd' to toggle debugging lines.<br/>Click the mouse to generate new vehicles."
//   );

}

function draw() {
// declare the time variables
    m = minute();
    h = hour();
    s = second();

  background(144, 238, 144);
  // Display the path
  path.display();

  textSize(12);
  for (let v of vehicles) {
    // Path following and separation are worked on in this function
    v.applyBehaviors(vehicles, path);
    // Call the generic run method (update, borders, display, etc.)
    v.run();
  }

  noStroke();
  textSize(25);
  text('Time: '+h+':'+m+':'+s, 50, 430);
}

function newPath() {
  // A path is a series of connected points
  // A more sophisticated path might be a curve
  path = new Path();
  let offset = 50;
  let bOffset = 250
  path.addPoint(offset, offset);
  path.addPoint(width - offset, offset);
  path.addPoint(width - offset, height - bOffset);
  path.addPoint(width - offset * 3 , height - bOffset);
  path.addPoint(width-offset * 3, height - bOffset - offset* 4.5);
  path.addPoint(width-offset * 5, height - bOffset - offset * 4.5)

  path.addPoint(width / 2, height - bOffset);
  path.addPoint(offset, height - bOffset);
}

function newVehicle(x, y) {
  let maxspeed = random(2, 4);
  let maxforce = 0.3;
  vehicles.push(new Vehicle(x, y, maxspeed, maxforce));
}

function keyPressed() {
  if (key == "d") {
    debug = !debug;
  }
}

function mousePressed() {
  newVehicle(mouseX, mouseY);
}
