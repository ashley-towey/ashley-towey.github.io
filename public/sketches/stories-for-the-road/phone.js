// Tilting the phone sets the typeface's weight (left and right) and optical
// size (forwards and back). iOS asks for permission to read the sensors,
// which needs a tap, so a button is shown there first.
let permissionGranted = false;
let variable;

function setup() {
  noCanvas();
  variable = select('.variable');

  const needsPermission = typeof DeviceOrientationEvent !== 'undefined'
    && typeof DeviceOrientationEvent.requestPermission === 'function';
  if (!needsPermission) {
    permissionGranted = true;
    return;
  }
  const button = createButton('Tap to allow motion sensors');
  button.addClass('button sensor-button');
  button.mousePressed(() => {
    DeviceOrientationEvent.requestPermission()
      .then((response) => { permissionGranted = response === 'granted'; })
      .catch(console.error)
      .finally(() => button.remove());
  });
}

function draw() {
  if (!permissionGranted) return;
  const aero = constrain(map(round(rotationX), 20, 60, 0, 100), 0, 100);
  const weight = constrain(map(round(rotationY), -30, 30, 0, 100), 1, 100);
  variable.style('font-weight', weight);
  variable.style('font-variation-settings', `'opsz' ${aero}`);
}
