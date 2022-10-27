let noiseValue = 4;
let bgFillCol = 0;
let strokeCol = 255;

function setup() {
    createCanvas(windowWidth, windowHeight);
    noLoop();
  }
  
  function draw() {
    resetSketch();
  }

function keyPressed() {
  if (keyCode === DOWN_ARROW){
    noiseValue -= .5;
  } else if (keyCode === UP_ARROW){
    noiseValue += .5;
  } else if (keyCode === RIGHT_ARROW) {
    bgFillCol = 0;
    strokeCol = 255;
  } else if (keyCode === LEFT_ARROW) {
    bgFillCol = 255;
    strokeCol = 0;
  }

  console.log(noiseValue);
  redraw();
}

function mousePressed() {
  resetSketch();
  console.log('mouse is pressed');
}

function resetSketch() {
  background(bgFillCol);
  noFill();
  stroke(strokeCol);

  beginShape();
  for (var x = -150; x < width+150; x++) {
    var nx = map(x, 0, width, 0, noiseValue);
    var y = height * noise(nx);
    //vertex(x, y);
    strokeWeight(.2);
    ellipse(x, y, 300);
  }
  endShape();

}