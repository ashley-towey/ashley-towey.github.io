let permissionGranted = false;
let weight;
let aero;

// variables from the variable font example
let weightSlider;
let slantSlider;
let casualSlider;
let variable;

function setup() {
    createCanvas(windowWidth, windowHeight);

    weight = 50;
    aero = 50;

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
        // background(0, 255, 0);
        textSize(48);
        text("non ios 13 device", 100, 100);
    }

    // initialising the sliders from the variable font example
    weightSlider = createSlider(300, 1000, 300);
    weightSlider.style('width', '180px');
    
    slantSlider = createSlider(-15, 0, 0);
    slantSlider.style('width', '180px');
    
    casualSlider = createSlider(0, 1, 0, 0.01);
    casualSlider.style('width', '180px');
    
    variable = select('.variable');

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

    if (!permissionGranted) return;

    background(255);

    textSize(72);
    text("Rotation X: " + rotationX, 100, 100);
    text("Rotation Y: " + rotationY, 100, 200);

    // adding the sliders for the variable font
    variable.style('font-weight', rotationX);
    variable.style('font-variation-settings', "'slnt' " + slantSlider.value() + ", 'CASL' " + casualSlider.value());

    // rotationX & rotationY to do something here...
    // weight & aero
    // const weight = constrain(rotationX, 0, 100);
    // const aero = constrain(rotationY, 0, 100);
      // variable.style('font-weight', 300+mouseX);

      // just using this to send another push update



}