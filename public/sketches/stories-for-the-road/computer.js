// The cursor sets the typeface's weight (up and down) and optical size
// (side to side). Any key shows another story.
let variable;

function setup() {
  noCanvas();
  variable = select('.variable');
  document.body.addEventListener('keydown', () => location.reload());
}

function draw() {
  const aero = constrain(map(mouseX, 100, windowWidth - 100, 0, 100), 0, 100);
  const weight = constrain(map(mouseY, 100, windowHeight - 100, 100, 0), 1, 100);
  variable.style('font-weight', weight);
  variable.style('font-variation-settings', `'opsz' ${aero}`);
}
