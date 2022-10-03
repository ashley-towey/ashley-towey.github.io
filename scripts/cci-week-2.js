let x = 1;

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


/*
// Brief: Design a colour picker for an image. 

let x, y, c;
let img1, img2;
let imgResult;

function preload() {
  img = loadImage('assets/shapes.jpg');
  img2 = loadImage('assets/shapes2.jpg');
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

