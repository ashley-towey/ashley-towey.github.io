/* Changing Background Colour Sketch
let bgColR = 0;
let bgColG = 0;
let bgColB = 0;

function setup() {
    // background(220);
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background (bgColR, bgColG, bgColB);
    fill (250, 200, 100);
    ellipse(mouseX, mouseY, 50);
}

function mousePressed() {
    bgColR = random(0, 255);
    bgColG = random(0, 255);
    bgColB = random(0, 255);
}
*/

/* Push and Pop examples */
/* Long Version of code
let angleOne = 0;
let angleTwo = 0;
let angleThree = 0;
let angleFour = 0;
let angleFive = 0;
let xpos = 80;
let xstep = 60;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background (20);
    // Rectangle 1
    push();
        fill (153, 50, 204);
        translate(xpos + (xstep * 0), height/2);
        rotate(angleOne);
        rect(0, 0, 50, 50);
        angleOne = angleOne + 1;
    pop();

    // Rectangle 2
    push();
        fill(155, 10, 50);
        translate (xpos + (xstep * 1), height/2);
        rotate (angleTwo);
        rect(0, 0, 50, 50);
        angleTwo = angleTwo + 25;
    pop();

    // Rectangle 3
    push();
        fill(40, 0, 180);
        translate (xpos + (xstep * 2), height/2);
        rotate (angleThree);
        rect(0, 0, 50, 50);
        angleThree = angleThree + 15;
    pop();

        // Rectangle 4
        push();
            fill(50, 100, 10);
            translate (xpos + (xstep * 3), height/2);
            rotate (angleFour);
            rect(0, 0, 50, 50);
            angleFour = angleFour + 50;
        pop();

            // Rectangle 5
        push();
            fill(240, 200, 0);
            translate (xpos + (xstep * 4), height/2);
            rotate (angleFive);
            rect(0, 0, 50, 50);
            angleFive = angleFive + 5;
        pop();
}
*/

/* Push and pop examples using arrays and loops */
let angles = [0, 0, 0, 0, 0];
let speeds = [1, 25, 10, 5, 2];
let xpos = 80;
let xstep = 60;

function setup() {
    createCanvas(400, 400);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(0);

    for (let i = 0; i < angles.length; i++) {
        push();
            fill (153, 50, 204);
            translate(xpos + (xstep * i), height/2);
            rotate(angles[i]);
            rect(0, 0, 50, 50);
            angles[i] = angles[i] + speeds[i];
        pop();
    }
}

