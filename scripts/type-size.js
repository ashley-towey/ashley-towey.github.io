function setup() {
    createCanvas(windowWidth, windowHeight);

    // DeviceOrientationEvent, DeviceMotion Event
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device
        background(255, 0, 0);
    } else { 
        // non ios 13 device
        background(0, 255, 0);
    }
}

function draw() {
    // background(200);
}