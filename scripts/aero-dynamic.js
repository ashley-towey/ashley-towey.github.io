let weightSlider;
let slantSlider;
let casualSlider;
let variable;

function setup() {
  noCanvas()
  
  weightSlider = createSlider(300, 1000, 300);
  weightSlider.style('width', '180px');
  
  slantSlider = createSlider(-15, 0, 0);
  slantSlider.style('width', '180px');
  
  casualSlider = createSlider(0, 1, 0, 0.01);
  casualSlider.style('width', '180px');
  
  variable = select('.variable');
}

function draw() {
  background(220);
  
  // variable.style('font-weight', 300+mouseX);
  variable.style('font-weight', weightSlider.value())
  variable.style('font-variation-settings', "'slnt' " + slantSlider.value() + ", 'CASL' " + casualSlider.value());
}