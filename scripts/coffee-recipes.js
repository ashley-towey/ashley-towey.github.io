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
let grindSize = ['Medium', 'Fine', 'Coarse', 'Very Fine']; // grind size for the various brew methods
let coffeeOutput; // user inputted value, used in calculations
let coffeeWeight; // weight of ground beans to be used calculation=[coffeeOutput/ratio[bC]]
let waterInput; // total water needed to start the brew with calculation=[coffeeOutput + 2*coffeeWeight]
// drawing shapes variables
let squareSize = 400; // size of the squares
let xPos = 525; // x position for GUI elements
let yPos = 110; // y position for GUI elements
let recY = 280;
// variable to change the size of water rectangle
let waterHeight;
let brewHeight;
let yVal; // total height of the water square
let adder; // changes the speed of growing and shrinking

function setup() {
  createCanvas(windowWidth, windowHeight);
  
  // creates an HTML checkbox with the text 'draw circle' next
  // to it, initially unchecked (false)
  dropdown = createSelect();
  dropdown.position(xPos, yPos); // add this line in when I am ready to position things
  
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
  submitInput.position(xPos, yPos + 75); // add this line in when I am ready to position things
  submitInput.input(isNumber); // restrict the input to numbers

  // add a submit button for coffee output weight
  submit = createButton('Brew!');
  submit.position(xPos, yPos + 100);
  submit.mousePressed(updateRecipe); // update the recipe based on the coffee output

  // add a download button that will save the recipe as a .txt file
  // need to create this later
  download = createButton('Download');
  download.position(xPos, recY + 120);
  download.mousePressed(downloadRecipe);

  // variable to change the size of water rectangle
  yVal = 50; // total height of the water square
  brewHeight = 50; // starting position of the brewed coffee
  adder = .35; // changes the speed of brew time
}


function draw() {
  background(255);

  if (!coffeeOutput || !selectedEquipment) {
    // selectedEquipment is initially undefined, so this only
    // shows up when the sketch first starts and user has yet
    // to select an option.
    text("What brew method do you have?", xPos, 100);
    text("How much coffee do you want?", xPos, yPos + 65);
  } else {
    // show the selection
    writeRecipe(); // write the text recipe
    animateCoffee(); // animate the coffee brewing process and ratio
  }

  drawDiagram();

}

function drawDiagram(){
    // draw the various elements of the input -> machine -> output diagram
    stroke(0);
    noFill();
    rect(50, 50, squareSize, squareSize);
    rect(squareSize + 100, 50, squareSize); 
    rect(squareSize * 2 + 150, 50, squareSize, squareSize); 
    fill(0); // turn to fill black after drawing squares
    noStroke();
}
function writeRecipe(){
    // replace the initial text with current brewing text
    text("You are brewing with " + selectedEquipment, xPos, 100); // show the chosen equipment
    text("And you'll get " + coffeeOutput + "ml of coffee", xPos, yPos + 65); // show the total coffee output
    
    // Display the Brew Recipe
    /*************************/
    textStyle(BOLD) // bolden the title to differentiate the text
    text("Brew Recipe", xPos, recY);
    textStyle(NORMAL); // reset the text weight
    text("Ratio: 1:" + ratio[bC], xPos, recY + 20); // display the brew ratio
    coffeeWeight = coffeeOutput/ratio[bC]; // calculation for the precise coffee weight
    text("Coffee: " + round(coffeeWeight, 1) + "g", xPos, recY + 40); // display the weight of coffee in grams
    // convert to floats in order to make the calculations
    // there's probably a more elegant way of doing this
    // but my brain isn't functioning enough to sort
    let coffeeOutputFloat = float(coffeeOutput); // float conversion
    let coffeeWeightFloat = float(coffeeWeight); // float conversion
    waterInput = coffeeOutputFloat + coffeeWeightFloat*1; // calculation for water input factoring in losses of 1x the coffee weight
    text("Water input: " + round(waterInput) + "ml", xPos, recY + 80); // round water to whole number and display
    text("Grind size: " + grindSize[bC], xPos, recY + 60); // round grind size to 1 decimal place and display

}

function animateCoffee(){
    coffeeHeight = squareSize/ratio[bC]; // calculate the height of the coffee cube
    fill(111-20, 78-20, 55-20); // slightly darker brown than the brewed coffee 
    rect(50, 450-coffeeHeight, squareSize, coffeeHeight); // dry coffee cube
    waterHeight = squareSize - coffeeHeight; // calculate the leftover space in the cube for water
    fill(135+20, 206+20, 235+20); // blue/water colour
    rectMode(CORNERS); // CHANGED in order to control the height
    rect(50, yVal, 450, waterHeight + 50); // water rectangle

    // brewed coffee appearing on the other side
    fill(111, 78, 55); // brown colour
    rect(1350, brewHeight, 950, 450); // brewed coffee rectangle
    rectMode(CORNER); // reset to default rectMode
    // console.log(brewHeight);

    // increment the y value to animate the brewing process
    if (yVal < waterHeight + 50){
        yVal = yVal + adder;
        // console.log(yVal); // just checking it works how I was thinking it would tehe
    }
    // the same animation with the brewed coffee but going all the way to the bottom of the cube
    if (brewHeight > 50) {
        brewHeight = brewHeight - adder;
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
    // console.log(coffeeOutput); // check that the coffee output is what I expect

    // resetting animation variables to trigger
    yVal = 50; // when 'Brew!' is pressed reset the position of water animation
    brewHeight = 450; // when 'Brew!' is pressed reset the starting position of brewed coffee

}

function isNumber() {
    // function that restricts the input field to numbers and 4 characters
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

  function downloadRecipe() { 
    // Initialise time variables to document brew time
    let s = second();
    let h = hour();
    let min = minute();
    let d = day();
    let m = month();
    let y = year();
    let seed = random(100, 999); // random seed to differentiate recipes
    
    // creates a file called 'example-name.txt'
    let writer = createWriter(selectedEquipment + " Recipe #" + round(seed) + ".txt"); 
    // writes .txt file content
    writer.write("Recipe by the Coffee Recipe Generator" + '\n');
    writer.write("Available here: https://ashleytowey.com/projects/coffee-recipes.html" + '\n');
    writer.write('Created ' + d + '/' + m + '/' + y + ' at ' + h + ':' + min + ':' + s);
    writer.write('\n\n'); // new paragraph/double line space
    writer.write("** The Recipe **" + '\n');
    writer.write("Brew method: " + selectedEquipment + '\n');
    writer.write("Ratio: 1:" + ratio[bC] + '\n');
    writer.write("Coffee grounds: " + round(coffeeWeight, 1) + "g" + '\n');
    writer.write("Grind size: " + grindSize[bC] + '\n');
    writer.write("Water input: " + round(waterInput, 0) + "ml" + '\n'); 
    writer.write("Coffee output: " + round(coffeeOutput, 0) + "ml" + '\n');
    writer.write('\n\n' + "Happy Brewing!")
    // close the PrintWriter and save the file
    writer.close();
        
  } 