/*************************************************************/

/* Coffee Recipe Generator
 * ---
 * Based on the desired output [millitres or number of people]
 * Generate a recipe to brew some coffee with the selected equipment 
 * Downloadable recipe in the form of a text file
 * Mobile and desktop friendly [to be hosted on my website]
 * Live graphical representation of ratios, process [input/machine/output]
 */

/*[CREDITS]
 * ---
 * Dropdown - code adapted from user 'kjhollen' on p5js web editor
 * hyperlink: https://editor.p5js.org/kjhollen/sketches/sI3IJNmVj 
 * ---
 * Restrict input field to numerical values - code adapted from user 'Bassam' on p5js web editor
 * hyperlink: https://editor.p5js.org/Bassam/sketches/Sn2W53QtO
 * ---
 */

/*************************************************************/

// variables for the dropdown functionality
let dropdown;
let selectedEquipment; 

// variables for coffee ratio and recipe
let bC; // shortened 'brewCounter' to jump through the different arrays of data about the various brew methods
let ratio = [16, 6, 12, 2]; // ratio of water to coffee. This controls a lot of the output. 
let coffeeOutput; // user inputted value, used in calculations

function setup() {
  createCanvas(400, 400);
  
  // creates an HTML checkbox with the text 'draw circle' next
  // to it, initially unchecked (false)
  dropdown = createSelect();
  // dropdown.position(50, 200); // add this line in when I am ready to position things
  
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
  dropdown.changed(changeEquipment);

  // create an input to put the total output weight
  submitInput = createInput();
//   submitInput.position(50, 250); // add this line in when I am ready to position things
  submitInput.input(isNumber); // restrict the input to numbers

  // add a submit button for coffee output weight
  submit = createButton('Submit');
  // submit.position(x, y);
  submit.mousePressed(updateRecipe); // update the recipe based on the coffee output

}


function draw() {
  background(240);
  
  if (!selectedEquipment) {
    // selectedEquipment is initially undefined, so this only
    // shows up when the sketch first starts and user has yet
    // to select an option.
    text("Please select a brew method (below)", 50, 100);
  } else {
    // show the selection
    text("Recipe for " + selectedEquipment, 50, 100);
    // show other data below to test functionality
    text("Brew ratio: 1:" + ratio[bC], 50, 120);

  }

  if (!coffeeOutput) {
    // coffeeOutput is initially undefined
    // Prompt the user to input output weight
    text("Please select the desired output (below)", 50, 200);
  } else {
    // show the selection
    text("Coffee output: " + coffeeOutput + "ml", 50, 200); // show the total coffee output
  }

}



function changeEquipment() {
    selectedEquipment = dropdown.value();
    // update brewCounter(bC) when the brew method is changed
    // this creates the counter function that changes other variables
    if (selectedEquipment == 'V60'){
        bC = 0;
    } else if (selectedEquipment == 'Aeropress'){
        bC = 1;
    } else if (selectedEquipment == 'French Press'){
        bC = 2;
    } else if (selectedEquipment == 'Dedica EC685'){
        bC = 3;
    }
}

function updateRecipe() {
    coffeeOutput = submitInput.value();
    console.log(coffeeOutput); // check that the coffee output has been logged


}

// function that restricts the input field to numbers and 4 characters
function isNumber() {
    let s = this.value();
    let c = s.charCodeAt(s.length - 1);
    // console.log(c); // logs that character code to the console
  
    if (!(c > 47 && c < 58)) {
      
      //is not a number
      this.value(s.substring(0, s.length - 1));
  
    } else {
      //is a number
          if (s.length <= 4) {
  
      } else {
        this.value(s.substring(0, s.length - 1));
      }
    }
  }