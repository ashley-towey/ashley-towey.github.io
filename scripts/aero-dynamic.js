let weightSlider;
let slantSlider;
let casualSlider;
let variable;

// load in the font
let font;

function preload() {
  font = loadFont('../data/AeroDynamic_2VF.ttf');
}

function setup() {
  noCanvas()
  
  weightSlider = createSlider(0, 100, 50);
  weightSlider.style('width', '180px');
  
  slantSlider = createSlider(0, 100, 0);
  slantSlider.style('width', '180px');
  
//   casualSlider = createSlider(0, 1, 0, 0.01);
//   casualSlider.style('width', '180px');
  
  variable = select('.variable');
}

function draw() {
  background(220);
  
  // variable.style('font-weight', 300+mouseX);
  variable.style('font-weight', weightSlider.value())
  variable.style('font-variation-settings', "'slnt' " + 50);

  console.log(slantSlider.value());
}