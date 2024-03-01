/********** The Broken Stopwatch **********
  
  The code for this stopwatch is missing some parts.
  
  Can you get it to work?
  
  1. Debug and fix the code errors. 
  2. Start and stop the timer.
  3. Count the time in seconds.
  4. Display the timer in 00:00 (minutes and seconds)
  
  Extra stuff:
  
  1. Can you add a reset button?
  2. Can you count by 1/10th of a second?
  
******************************************/
let Start;
let time=0;
let dt=0.1;

let button;
let buttonLabel;

let font;

function preload() {
  font = loadFont('../data/PPSupplySans-Regular.otf');
}

function setup() {
  createCanvas(500, 300);
  frameRate(10);
  textFont(font);

  Start=0;
  buttonLabel = "Start"

  // Create a start button on the right side of the screen
  button = createButton(buttonLabel);
  button.style('font-family', 'PPSupplySans-Regular');
  button.style('font-size', '25px');
  button.position(width - 160, height - 60);
  button.mousePressed(startTimer);
}

function draw() {
  // Draw the timer background
  background(230);
  rect(50, 90, width-100, 100);

//   text(time, 50, 100, width-100, 100);
  
//   if (timerIsRunning) {
//     // Do something? 
//   }

  if (Start===1){
    time=time+dt;
    }

      
  // Draw the timer
  textSize(50);
  textAlign(LEFT);
  text(round(time, 1),windowWidth/2.2,50);
}

function startTimer() {
    if (Start===0) {
    Start=1;
    buttonLabel = "Stop";
    button.html(buttonLabel);
    } else {
    Start=0;
    buttonLabel = "Start";
    button.html(buttonLabel);
    }
}
