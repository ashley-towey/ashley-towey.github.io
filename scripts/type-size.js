let permissionGranted = false;
let weight;
let aero;

// load in the font
let font;

function preload() {
  font = loadFont('../data/AeroDynamic_2VF.ttf');
}

// variable to affect the HTML DOM element type
let variable;

function setup() {
    createCanvas(windowWidth, 500);
    
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
    background(255);

    // rounding the numbers to make animation smooth
    let roundedX = round(rotationX);
    let roundedY = round(rotationY);

    // adding the sliders for the variable font
    let aero = map(roundedX, -40, 40, 0, 100);
    let weight = map(roundedY, -80, 0, 0, 100);


    // CHANGE the values based on whether the device is in portrait or landscape
    let portrait = window.matchMedia("(orientation: portrait)");

    portrait.addEventListener("change", function(e) {
        if(e.matches) {
            // Portrait mode
            text("portrait mode", 100, 500);
        } else {
            // Landscape
            text("landscape mode", 100, 550);
        }
})

    variable.style('font-weight', weight);
    variable.style('font-variation-settings', "'slnt' " + aero);

    if (!permissionGranted) return;

    // // testing text below
    // textSize(30);
    // text("Rotation X: " + roundedX, 100, 100);
    text("Rotation Y: " + roundedY, 100, 200);
    text("Rotation X:  " + roundedX, 100, 300);
    text("weight: " + weight, 100, 400);
    text("CDA: "+ aero, 100, 500);
}