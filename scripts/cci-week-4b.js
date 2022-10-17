let counter = 0; 
let step = 80;
let x = step/2;
let y = step/2;

function setup() {
    createCanvas(400, 400);
    background(0);
}

function draw() {

    while(counter <= (width/step)*(height/step)) {
    fill (30, 100, 50);
    ellipse(x, y, step, step);
    counter++;
    }

}