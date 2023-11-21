let button;
let permissionGranted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // DeviceOrientationEvent, DeviceMotion Event
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device
        background(255, 0, 0);
        button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );

    } else { 
        // non ios 13 device
        background(0, 255, 0);
    }
}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            permissionGranted = true;
        }
    })
    .cartch(console.error);
}

function draw() {
    // background(200);
}