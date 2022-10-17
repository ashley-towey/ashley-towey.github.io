let counter = 0; 
let step = 160;
let x = step/2;
let y = step/2;
let opacity = 0;

function setup() {
    createCanvas(800, 800);
    noStroke();
    frameRate(10);
    // background(240); // moving the background to be able to animate

}

function draw() {
    // for (let i = 0; i > 255; i++) {
    //     opacity = i
    // }
    /*
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
*/

    background(0);
    if (counter%2 === 0) {
        fill(255);
    } else {
        fill(0, 0, 255);
    }

    ellipse(x, y, step);
    ellipse()

    x += step;

    if (x >= width) {
        x = step/2;
        y += step;
    }

    if(x >= width-step && y >= height-step) {
        counter = 0;
        x = step/2;
        y = step/2;
    }
}
