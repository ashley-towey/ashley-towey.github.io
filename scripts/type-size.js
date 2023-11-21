let permissionGranted = false;

function setup() {
    createCanvas(windowWidth, windowHeight);

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
    // background(200);
    if (!permissionGranted) return;

    background(255);

    textSize(72);
    text("Rotation X: " + rotationX, 100, 100);
    text("Rotation Y: " + rotationY, 100, 200);
}