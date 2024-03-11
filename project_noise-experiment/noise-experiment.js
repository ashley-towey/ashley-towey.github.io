
var yoff = 0.0;

function setup() {
  createCanvas(600, 600);
}

function draw() {
  background(0);

// the animation stuff below this line
  push(); // start drawing state
  noFill();
  strokeWeight(2);
  stroke(255);

  translate(width / 2, height / 2);

  var radius = 150;

  beginShape();
  var xoff = 0;
  for (var a = 0; a < TWO_PI; a += 0.1) {
    var offset = map(noise(xoff, yoff), 0, 1, -150, 200);
    var r = radius + offset;
    var x = 0.6*r * cos(a);
    var y = 1.2*r * sin(a);
    vertex(x, y);
    xoff += 0.1;
    // ellipse(x, y, 4, 4);
  }
  endShape();

  yoff += 0.01;

  pop(); // reset drawing state

  // text information
  noStroke();
  fill(0);
  textSize(25);
  textFont('Courier New');
  rect(width/2, height/2-20, 250, 55);
  fill(255);
  text('Generative', width/2, height/2);
  text('Branding', width/2, height/2+25);

}