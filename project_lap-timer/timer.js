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
let Minute;

let lapButton; // button to add a lap
let laps; // variable to store the variable for number of laps

let button;
let buttonLabel;

let font;

function preload() {
  font = loadFont('../data/PPSupplySans-Regular.otf');
}

function setup() {
  createCanvas(windowWidth, 600);
  frameRate(10);
  textFont(font);

  Start=0;
  buttonLabel = "Start";

  Minute=0;

  laps = 0;

  // Create a start button on the right side of the screen
  button = createButton(buttonLabel);
  button.style('font-family', 'PPSupplySans-Regular');
  button.style('font-size', '25px');
  button.position(width/25, height - 60);
  button.mousePressed(startTimer);

  // create a lap button to add 1 to the lap value
   lapButton = createButton("+1 Lap");
   lapButton.style('font-family', 'PPSupplySans-Regular');
   lapButton.style('font-size', '25px');
   lapButton.position(width/5, height - 60); 
   lapButton.mousePressed(addLap);
}

function draw() {
  // Draw the timer background
  background(0, 0, 0);

//   text(time, 50, 100, width-100, 100);
  
//   if (timerIsRunning) {
//     // Do something? 
//   }
  if (time > 60) {
    time = 0;
    Minute += 1;
  }

  if (Start===1){
    time=time+dt;
    }

  // Draw the seconds part of the timer
  fill(255, 255, 255);
  textSize(120);
  textAlign(LEFT);
  text(round(time, 1),width/1.87,200);
  // draw the seperater
  text(':', width/2, 185);
  // draw the minutes part of the timer
  textAlign(RIGHT);
  text(round(Minute, 1),width/2.05,200);

  // Draw the lap counter
  text(round(laps, 1),width/2.2,400);
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

function addLap() {
    laps += 1;
}