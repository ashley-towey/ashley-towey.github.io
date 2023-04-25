let happySound; // create a variable for "Happy"
let excitedSound; // create a variable for "Excited"
let anxiousSound; // create a variable for "Anxious"
let sadSound; // create a variable for "Sad"

let bgCol;

function preload() {
  soundFormats('mp3', 'ogg');
  happySound = loadSound('../data/happy.mp3');
  excitedSound = loadSound('../data/excited.mp3');
  anxiousSound = loadSound('../data/anxious.mp3');
  sadSound = loadSound('../data/sad.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
    bgCol = 200;
}

function draw() {
    background(bgCol);

    /* Happy Section */
    strokeWeight(2.5);
    if(mouseX>50&&mouseX<250&&mouseY>50&&mouseY<250){
        fill(186, 237, 169);
    } else {
        fill(160, 215, 149);
    }
    rect(50, 50, 200, 200, 15); 
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text('HAPPY', 150, 160);

    /* Excited Section */
    strokeWeight(2.5);
    if(mouseX>300&&mouseX<500&&mouseY>50&&mouseY<250){
        fill(255, 125, 0);
    } else {
        fill(235, 105, 0);
    }
    rect(50+250, 50, 200, 200, 15); 
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text('EXCITED', 150+250, 160);

    /* Anxious Section */
    strokeWeight(2.5);
    if(mouseX>300+250&&mouseX<500+250&&mouseY>50&&mouseY<250){
        fill(255, 0, 109);
    } else {
        fill(235, 0, 90);
    }
    rect(550, 50, 200, 200, 15); 
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text('ANXIOUS', 150+250+250, 160);

    /* Sad Section */
    strokeWeight(2.5);
    if(mouseX>300+250+250&&mouseX<500+250+250&&mouseY>50&&mouseY<250){
        fill(240, 20, 20);
    } else {
        fill(220, 0, 0);
    }
    rect(550+250, 50, 200, 200, 15); 
    textAlign(CENTER);
    textSize(30);
    fill(0);
    text('SAD', 150+250+250+250, 160);
}

function mousePressed() {
    if(mouseX>50&&mouseX<250&&mouseY>50&&mouseY<250){
        console.log("I am Happy!");
        happySound.play();
    } else if(mouseX>300&&mouseX<500&&mouseY>50&&mouseY<250){
        console.log("I am Excited");
        excitedSound.play();
    } else if(mouseX>300+250&&mouseX<500+250&&mouseY>50&&mouseY<250){
        console.log("I am Anxious");
        anxiousSound.play();
    } else if(mouseX>300+250+250&&mouseX<500+250+250&&mouseY>50&&mouseY<250){
        console.log("I am Sad");
        sadSound.play();
    }
}