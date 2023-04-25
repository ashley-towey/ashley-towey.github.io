let happySound; // create a variable for "Happy"
let excitedSound; // create a variable for "Excited"
function preload() {
  soundFormats('mp3', 'ogg');
  happySound = loadSound('../data/happy.mp3');
  excitedSound = loadSound('../data/excited.mp3');
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(200);
    
    rect(50, 50, 200, 200); 
    // rect(300, 50, 200, 200);
    // rect(550, 50, 200, 200);
    // rect(800, 50, 200, 200);
    if(mouseX>50&&mouseX<250&&mouseY>50&&mouseY<250){
        fill(160, 215, 149);
    } else {
        fill(186, 237, 169);
    }
}

function mousePressed() {
    if(mouseX>50&&mouseX<250&&mouseY>50&&mouseY<250){
        console.log("I am Happy!");
        happySound.play();
    } else {
        console.log("You need to press the button");
        excitedSound.play();
    }
}