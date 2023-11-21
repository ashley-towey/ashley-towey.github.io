let button;
let permissionGranted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

    // DeviceOrientationEvent, DeviceMotion Event
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device
        // background(255, 0, 0);
        button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );

    } else { 
        // non ios 13 device
        // background(0, 255, 0);
        textSize(48);
        text("non ios 13 device", 100, 100);
    }
}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            permissionGranted = true;
        }
    })
    .catch(console.error);

    button.remove();
}

function draw() {
    // background(200);
    if (!permissionGranted) return;

    background(255);

    textSize(72);
    text(rotationX, 100, 100);
}