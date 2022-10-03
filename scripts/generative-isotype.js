let sel;
let bgCol;
let circleCol;
let textCol;
let hexCol;
let bubbles = [];
let hex = [];

function setup() {
  let c = createCanvas(600, 600);
  
  // name input
  createP('Your name here:');
  nameInput = createInput('identity');
  
  // age input
  for (let i = 0; i < 500; i++) {
    bubbles[i] = new Bubble(this.x, this.y, this.r);
  }
  
  // age input
  createP('Your age here:');
  ageInput = createInput('');
  ageInput.value(ageInput.value());
  
  
  
  // height input
  for (let i = 0; i < 1000; i++) {
    hex[i] = new Hex(this.a, this.b, this.c);
  }
  // height input
  createP('Your height (in centimetres) here:');
  heightInput = createInput('');
  heightInput.value(heightInput.value());
  
  
  
  // // circleCol mood input
  createP('Your mood here: ')
  sel = createSelect();
  // sel.position(10, 850);
  sel.option('your mood:');
  sel.option('happy');
  sel.option('sad');
  sel.option('energetic');
  sel.option('numb');
  sel.option('calm');
  sel.option('confused');
  sel.option('tired');
  sel.option('stressed');
  sel.option('hungry');
  sel.changed(changeCol); 
  
  circleCol = color(255, 150);
  bgCol = color(230);
  textCol = color(255);
  hexCol = color(255, 150);
  
  createP('');
  removeBtn = createButton("Save"); 
  // removeBtn.position(10, 890);
  removeBtn.mousePressed(saveToFile); 
  createP('');
}

function draw() {
    // background colour
  background(bgCol);
  
  // height/hex quantity
  let heightValue = heightInput.value() / 10;
    for (let h = 0; h < heightValue; h++) {
    hex[h].show();
  }
    
  // age/circles quantity
  let ageValue = ageInput.value();
  for (let i = 0; i < ageValue; i++) {
    bubbles[i].show();
  }
  
  fill(textCol);
  textSize(width / 15);
  textAlign(CENTER, CENTER);
  text(nameInput.value(), 300, 300);
  
  // time and date
  let s = second();
  let h = hour();
  let min = minute();
  let d = day();
  let m = month();
  let y = year();
  textSize(20);
  text(h + ':' + min + ':' + s, 300, 550);
  text(d + '/' + m + '/' + y, 300, 575);
}

class Bubble {
  constructor(x, y, r, t) {
    this.x = random(width);
    this.y = random(height);
    this.r = random(10, 40);
    // this.t = random(0, 10);
}
  
  show() {
    noStroke();
    strokeWeight(4);
    fill(circleCol);
    ellipse(this.x, this.y, this.r * 2);
  }
}

class Hex {
  constructor(a, b, c, red, green, blue) {
    this.a = random(width);
    this.b = random(height);
    this.c = random(0.01, 0.18);
    
    // colour
    // this.rot = random(0, 255);
    // this.grun = random(0, 255);
    // this.blau = random(0, 255);
  }
  
  show() {
    noStroke();
    strokeWeight(4); 
    // hexagon transparency
    // let val7 = slider7.value();
    fill(hexCol);
    hexagon(this.a, this.b, this.c*2);
  }
}

function hexagon(transX, transY, s) {
  push();
  translate(transX, transY);
  scale(s);
  beginShape();
  vertex(-75, -130);
  vertex(75, -130);
  vertex(150, 0);
  vertex(75, 130);
  vertex(-75, 130);
  vertex(-150, 0);
  endShape(CLOSE);
  pop();
}

function changeCol(){
 	let val = sel.value();
  if(val == 'happy'){
    circleCol = color(255, 125, 0, 180);
  } else if(val == 'sad'){
   	circleCol = color(24, 58, 35, 180);
  } else if(val == 'energetic'){
   	circleCol = color(23, 69, 59, 180);
  } else if(val == 'numb'){
   	circleCol = color(random(160, 180), 100); 
  } else if(val == 'calm'){
   	circleCol = color(10, 122, 166, 180);
  } else if(val == 'confused'){
   	circleCol = color(70, random(200, 255), random(80, 120), 200);
  } else if(val == 'tired'){
   	circleCol = color(122, 148, 123, 180);
  } else if(val == 'stressed'){
   	circleCol = color(189, 0, 0, 180);
  } else if(val == 'hungry'){
   	circleCol = color(150, 166, 33, 180);
  }
  
    if(val == 'happy'){
    bgCol = color(255, 221, 0);
  } else if(val == 'sad'){ 
   	bgCol = color(15,15,24);
  } else if(val == 'energetic'){
   	bgCol = color(65, 142, 55);
  } else if(val == 'numb'){
   	bgCol = color(240); 
  } else if(val == 'calm'){
   	bgCol = color(3, 56, 89);
  } else if(val == 'confused'){
   	bgCol = color(51, random(150, 200), random(200, 255));
  } else if(val == 'tired'){
   	bgCol = color(32, 44, 69);
  } else if(val == 'stressed'){
   	bgCol = color(230, 0, 19);
  } else if(val == 'hungry'){
   	bgCol = color(166, 134, 106);
  }
  
    if(val == 'happy'){
    textCol = color(255, 0, 109);
  } else if(val == 'sad'){
   	textCol = color(44, 52, 92);
  } else if(val == 'energetic'){
   	textCol = color(208, 218, 33);
  } else if(val == 'numb'){
   	textCol = color(random(160, 180)); 
  } else if(val == 'calm'){
   	textCol = color(1, 24, 38);
  } else if(val == 'confused'){
   	textCol = color(random(150, 200), 56, random(200, 255));
  } else if(val == 'tired'){
   	textCol = color(208, 199, 116);
  } else if(val == 'stressed'){
   	textCol = color(123, 2, 0);
  } else if(val == 'hungry'){
   	textCol = color(242, 164, 68); 
  }
  
    if(val == 'happy'){
    hexCol = color(1, 190, 254, 150);
  } else if(val == 'sad'){ 
   	hexCol = color(12,13,73, 150);
  } else if(val == 'energetic'){
   	hexCol = color(248, 128, 127, 180);
  } else if(val == 'numb'){
   	hexCol = color(random(160, 180), 100); 
  } else if(val == 'calm'){
   	hexCol = color(7, 89, 140, 150);
  } else if(val == 'confused'){
   	hexCol = color(random(200, 255), 141, 59, 200);
  } else if(val == 'tired'){
   	hexCol = color(58, 105, 101, 150);
  } else if(val == 'stressed'){
   	hexCol = color(247, 74, 69, 150);
  } else if(val == 'hungry'){
   	hexCol = color(191, 38, 4, 150);
  }
  
}

function updateAgeValue(){
  //if the textbox is updated, update the slider
  ageInput.value(ageInput.value())
}

function saveToFile() { 
  let name = nameInput.value();
  let age = ageInput.value();
  let height = heightInput.value();
  // Save the current canvas to file as png 
  let s = second();
  let h = hour();
  let min = minute();
  let d = day();
  let m = month();
  let y = year();
  let mood = sel.value();
  let seed = random(100, 999);
  // round(seed, [0]);
  
  // creates a file called 'name-data.txt'
  let writer = createWriter(name + '#' + round(seed) + '-data.txt');
  // write 'Hello world!'' to the file
  writer.write('Receipt #' + round(seed));
  writer.write('\n\nThis is the raw data that you inputted on ' + d + '/' + m + '/' + y + ' at ' + h + ':' + min + ':' + s + '.\n\n');
  writer.write('Name: ' + name + '\n');
  writer.write('Age: ' + age + '\n');
  writer.write('Height: ' + height + '\n');
  writer.write('Mood: ' + mood + '\n\n');
  writer.write('Does this reflect your identity?')
  // close the PrintWriter and save the file
  writer.close();
  
  saveCanvas(name + ' is ' + mood + ' ' + h + '-' + min + ' ' + d + '-' + m + '-' + y, 'jpg');
  
} 









