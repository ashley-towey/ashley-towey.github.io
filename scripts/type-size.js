let permissionGranted = false;
let weight;
let aero;

// load in the font
let font;

function preload() {
  font = loadFont('../data/AeroDynamic_2VF.ttf');
}

// variables from the variable font example
let weightSlider;
let slantSlider;
// let casualSlider;
let variable;

function setup() {
    createCanvas(windowWidth, 500);


    // initialising the sliders from the variable font example
    // weightSlider = createSlider(300, 1000, 300);
    // weightSlider.style('width', '180px');
    
    // slantSlider = createSlider(-15, 0, 0);
    // slantSlider.style('width', '180px');
    
    // casualSlider = createSlider(0, 1, 0, 0.01);
    // casualSlider.style('width', '180px');
    
    variable = select('.variable');

    // DeviceOrientationEvent, DeviceMotion Event 
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device
        DeviceOrientationEvent.requestPermission()
        .catch(() => {
            // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );

        throw error;
        })
        .then(() => {
            // on any subsquent visits
            permissionGranted = true;
        })

    } else { 
        // non ios 13 device
        textSize(48);
        text("non ios 13 device", 100, 100);
         }

}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            permissionGranted = true;
        } else {
            permissionGranted = false;
        }
    })
    .catch(console.error);

    this.remove();
}

function draw() {
    let roundedX = round(rotationX);
    let roundedY = round(rotationY);

    // adding the sliders for the variable font
    let weight = map(roundedX, -50, 50, 0, 100);
    let aero = map(rotationY, -50, 50, 0, 100);

    variable.style('font-weight', weight);
    variable.style('font-variation-settings', "'slnt' " + aero);
    
    console.log(weight);
    console.log(aero);
    //  console.log(slantSlider.value());

    if (!permissionGranted) return;

    background(255);

    textSize(72);
    text("Rotation X: " + roundedX, 100, 100);
    text("Rotation Y: " + roundedY, 100, 200);

    // rotationX & rotationY to do something here...
    // weight & aero
    // const weight = constrain(rotationX, 0, 100);
    // const aero = constrain(rotationY, 0, 100);
      // variable.style('font-weight', 300+mouseX);

      



}