let weightSlider;
let slantSlider;
let variable;

// variable to hold the state of the navigation
let Navigation

// new variables that will hold the speed and gradient values
let Speed;
let Gradient;

// variables that will control the typeface 
let Weight;
let Aero;

// load in the font
// let font;

function preload() {
  font = loadFont('../data/AeroDynamic_2VF.ttf');
}

function setup() {
  noCanvas()
  
  variable = select('.variable');

  // set the starting point for Speed & Gradient
  let Speed = 0;
  let Gradient = 0;

}

function draw() {
  background(220);

    // change the turn signal based on MouseX position
    if (mouseX > windowWidth/2) {
        Navigation = "&rarr;";
      } else {
        Navigation = "&larr;";  
    }
  
    // adding the sliders for the variable font
    Aero = map(mouseX, 0, windowWidth, 0, 100);
    Weight = map(mouseY, 0, windowHeight, 100, 0);

    // map the values of Aero and Weight to Speed and Gradient
    Speed = map(Aero, 0, 100, 0, 40);
    Gradient = map(Weight, 0, 100, -10, 10);

  // variable.style('font-weight', 300+mouseX);
  variable.style('font-weight', Weight);
  variable.style('font-variation-settings', "'slnt' " + Aero);

  // working but without input field

  document.getElementById("actual-speed").innerHTML = round(Speed)+" kph";
  document.getElementById("actual-gradient").innerHTML = round(Gradient)+" %";

  document.getElementById("navigation").innerHTML = Navigation;

}
