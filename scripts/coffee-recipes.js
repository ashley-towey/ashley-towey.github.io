// let equipment = ["V60", "AeroPress", "Dedica EC685"]; // need to become an array to accomodate more options
// let ratio = [16, 6, 2]; // make array shortly
// let water = 250;

// testArray = 0;

// function setup() {
//     createCanvas(400, 400);
//     // console.log(water/ratio[testArray]);
// }

// function draw() {
//     background(240);

//     // if (equipment == "V60") {
//     text('Method: ' + equipment[testArray], 10, 30);
//     text('Ratio: 1:' + ratio[testArray], 10, 50);
//     text('Water: ' + water + 'ml', 10, 70);
//     text('Coffee: ' + water/ratio[testArray] + 'g', 10, 90);
//     // }
// }

/*
 * Code adapted from user 'kjhollen' on p5js web editor
 * hyperlink: https://editor.p5js.org/kjhollen/sketches/sI3IJNmVj 
 * -- Adapted for use with my Coffee Project --
 * *********************
 * sets up a dropdown menu in HTML and updates the user's sketch
 * based on the selection.
 */

// variables for the dropdown functionality
let dropdown;
let selectedCoffeeBrewMethod;

// variables for coffee ratio and recipe
let bC; // shortened 'brewCounter' to jump through the different arrays of data about the various brew methods
let ratio = [16, 6, 12, 2]; // ratio of water to coffee. This controls a lot of the output. 

function setup() {
  createCanvas(400, 400);
  
  // creates an HTML checkbox with the text 'draw circle' next
  // to it, initially unchecked (false)
  dropdown = createSelect();
  
  // this option will show initially, but can't be chosen
  dropdown.option('-- choose a brew method --');
  dropdown.disable('-- choose a brew method --');
  dropdown.selected('-- choose a brew method --');
  
  // other options
  dropdown.option('V60');
  dropdown.option('Aeropress');
  dropdown.option('French Press');
  dropdown.option('Dedica EC685');

  // call this function when the item in the dropdown changes
  dropdown.changed(brewMethodSelected);
}

function brewMethodSelected() {
    selectedCoffeeBrewMethod = dropdown.value();
    // update brewCounter(bC) when the brew method is changed
    if (selectedCoffeeBrewMethod == 'V60'){
        bC = 0;
    } else if (selectedCoffeeBrewMethod == 'Aeropress'){
        bC = 1;
    } else if (selectedCoffeeBrewMethod == 'French Press'){
        bC = 2;
    } else if (selectedCoffeeBrewMethod == 'Dedica EC685'){
        bC = 3;
    }
}

function draw() {
  background(240);
  
  if (!selectedCoffeeBrewMethod) {
    // selectedCoffeeBrewMethod is initially undefined, so this only
    // shows up when the sketch first starts and user has yet
    // to select an option.
    text("Please select a brew method (below)", 50, 100);
  } else {
    // show the selection
    text("Looking at a recipe for " + selectedCoffeeBrewMethod, 50, 100);
    // show other data below to test functionality
    text("Brew ratio: 1:" + ratio[bC], 50, 120);

  }

}