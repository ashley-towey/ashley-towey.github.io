var t;

let font;

function preload() {
  font = loadFont('../data/PPSupplySans-Regular.otf');
}

function setup() {
  createCanvas(windowWidth * 0.8, windowHeight * 0.8);
  background(0);
  t = 0;

  textFont(font);

}

function draw() {
  // fade the background by giving it a low opacity
  background(0, 15);

  noiseSeed(4);
  var x = width * noise(t);
  var y = height * noise(t+5);
  
  var r = 255 * noise(t+10);
  var g = 255 * noise(t+15);
  var b = 255 * noise(t+20);

  // try have another object move with different noise
  noiseSeed(17);
  var x2 = width * noise(t);
  var y2 = height * noise(t+5);
  
  var r2 = r - 10;
  console.log(r2);
  var g2 = g + 10;
  var b2 = b - 5;
  
  noStroke();
  fill(r, g, b);
  ellipse(x, y, 120, 120);

  fill(255);
  textSize(80);
  textAlign(CENTER);
  text('Cycle Events', width/2, height/2);
  
  fill(r2, g2, b2);
  ellipse(x2, y2, 120, 120);


  t = t + 0.01;

}
