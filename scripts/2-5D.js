let variable;

// variables that control the 'wght' and 'opsz' of the font
// let Weight;
let Aero;



function setup() {
  noCanvas()
  
  variable = select('.variable');

}

function draw() {
  background(220);
  
    // map the values from the cursor to the typeface input range
    Aero = map(mouseX, 0+100, windowWidth - 100, 0, 100);
    // Weight = map(mouseY, 0+100, windowHeight - 100, 100, 0);

    // apply the value to the typeface
    // variable.style('font-weight', Weight);
    variable.style('font-variation-settings', "'opsz' " + Aero);

    // this function checks if any button has been pressed and then refreshes if that happens
  
}







