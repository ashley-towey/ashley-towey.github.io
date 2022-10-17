let counter = 0; 
let step = 80*2;
let x = step/2;
let y = step/2;

function setup() {
    createCanvas(400*2, 400*2);
    noStroke();
    frameRate(1);
    background(240); // moving the background to be able to animate

}

function draw() {
    while(counter <= (width/step)*(height/step)) {
    // use modulo function change colour of even counters
    if (counter%2 === 0) {
        fill(255, 200, 220);
    } else {
        fill(200, 200, 255);
    }

    ellipse(x, y, step); // draw the ellipse

    x += step; // add step to x and move forward by one

    if (x >= width) {
        x = step/2;
        y += step;
    }

    console.log(counter);
    counter++;

    }
counter=0;
}
