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

// variables for the google sheets API
var idNum = '1j8z_HROnw6KDso52nrUP63gJ5D3AJbhbRy9y-MGxVqU';
var sheet_name = 'Stories';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + idNum + '/values/' + sheet_name + '?alt=json&key=' + key;

let testVar;
let rowCounter;
let inputData;
let outputData;

// https://docs.google.com/spreadsheets/d/1j8z_HROnw6KDso52nrUP63gJ5D3AJbhbRy9y-MGxVqU/edit?usp=sharing

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

    console.log(Weight);

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

  // add an event listener to see if any button has been pressed
  document.body.addEventListener('keypress', myFunction);
  
}

// functions from the google sheets API
function processData(rows) {
  let headers = rows[0];
  let content = document.getElementById('content');
  rows.shift();

  rowCounter = round(random(0, rows.length - 1)); // finds a random number that is relevant and displays that information. 
  console.log(rowCounter);

  let inputData = rowCounter;
  let outputData = rows[inputData];

  // console.log(inputData);
  // console.log(outputData);

  // console.log(rows.length);
  // console.log(rowCounter);
  

    content.innerHTML += "<small>" + outputData[0] + "</small>";
    content.innerHTML += "<p>" +outputData[2]+"<p>";
    content.innerHTML += "<small><a href=https://what3words.com/" + outputData[3] + ">" + outputData[3] + "</a></small>";

    // https://what3words.com/

}

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));


// function mousePressed() {
// // redraw was called
//   location.reload();
// }

function myFunction(){
  //do what you want after key is pressed
  // redraw was called
  location.reload();
}

function externalLinks() {   for(var c = document.getElementsByTagName("a"), a = 0;a < c.length;a++) {     var b = c[a];     b.getAttribute("href") && b.hostname !== location.hostname && (b.target = "_blank")   } } ; externalLinks();


// updated font including punctuation