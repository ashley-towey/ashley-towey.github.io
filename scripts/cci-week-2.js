function setup() {
  createCanvas(700, 700);
}

function draw() {
  background('#FFFDD0');
  textAlign(CENTER);
  textSize(10);
  noStroke();

  fill(240, 0, 0);
  ellipse(100, 100, 100);
  fill(0, 0, 240);
  ellipse(500, 450, 50);
  fill('#fceea7');
  ellipse(150, 550, 200);
  fill(0, 240, 0);
  ellipse(400, 120, 40);

  fill(255);
  text('let there be life', 100, 100);
  text('help', 500, 450);
  text('oops...', 150, 550);
  text('look!', 400, 120);

  ellipse(mouseX, mouseY, 50);
}


/* let x = 1;

function printmsg(){
    let msg = 'Test ' + x;
    let p = document.createElement("p");
    p.innerHTML = msg;
    document.getElementsByTagName("body")[0].appendChild(p);
    console.log(msg);
    x = x + 1;
}
printmsg();
printmsg();
printmsg();
*/

/*
// Brief: Design a colour picker for an image. 

let x, y, c;
let img1, img2;
let imgResult;

function preload() {
  img = loadImage('../img/square.png');
  img2 = loadImage('../img/square.png');
}

function setup() {
  createCanvas(400, 400);  
  
  // imgResult = false;
}

function draw() {
  background(0);
  
  if (imgResult == true) {
  imgResult = img1;
  } else {
  imgResult = img2;
  }
  //console.log(imgResult);
  
  image(imgResult, 0, 0, width, height);
  x = mouseX;
  y = mouseY;
  let c = get(x, y);
  fill(c);
  strokeWeight(1.5);
  stroke(255);
  rect(10, height-90, 80, 80, 7);
  
}

function mousePressed() {
  // if (imgResult = true){
  //   imgResult = false;
  // } 
  // if (imgResult = false){
  //   imgResult = true;
  // }
  imgResult = !imgResult;
}
*/


