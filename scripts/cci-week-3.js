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
/*
let angles = [0, 0, 0, 0, 0];
let speeds = [1, 3, 6, 3, 1];
let words = ["hello", "world", "what's", "the", "weather"];
let xpos = 175;
let xstep = 60;

function setup() {
    createCanvas(600, 600);
    angleMode(DEGREES);
    rectMode(CENTER);
}

function draw() {
    background(240);

    for (let i = 0; i < angles.length; i++) {
        push();
            strokeWeight(3);
            // if statement for different colours on each rectangle
            if (i == 1) {
                stroke(255, 0, 0);
                fill(255, 0, 0, 100);
            } else if ( i == 3) {
                stroke(0, 0, 255) 
                fill(0, 0, 255, 100);
            } else {
                stroke (240, 200, 0);
                fill (240, 200, 0, 100);
            }

            translate(xpos + (xstep * i), height/2);
            rotate(angles[i]);
            rect(0, 0, 100, 100);
            fill(255);
            noStroke();
            textSize(15);
            textAlign(CENTER);
            text(words[i], 0, 30);
            angles[i] = angles[i] + speeds[i];
        pop();
    }
}
*/

/* Coding Challenge #1 
Draw a checkerboard grid of shapes and colours of your choice 
using a while loops and conditional statements. 

Hint: Use a conditional statement with a modulo (%) to determine 
whether your counter is odd or even. 

if (number%2 === 0) {
Console.log('even');
}
*/
/*
let counter = 0;
let step = 80;
let x = step/2;
let y = step/2;

function setup() {
    createCanvas(400, 400);
    background(0);
}

function draw() {
    while(counter < width*height) {
        noStroke();
        if (counter%2) {
            fill(250, 200, 0);
        } else {
            fill(153, 50, 204);
        }
        ellipse(x, y, step, step);
        x += step;

        if(x >= width) {
            x = step/2;
            y += step;
        }
        
        counter++;
    }
}
*/

/* Coding Challenge #2
Explore the blendMode() command by drawing a series of shapes 
on top of each other. 

Adjust their position on the canvas using the push() and pop() 
commands and translate() | rotate().

Hint: explore the commands blendMode(DIFFERENCE) and
blendMode(BLEND)
*/
/*
    let x = 400;
    let y = 400;

function setup() {
    createCanvas(800, 800);

    blendMode(DIFFERENCE);

    background(0);

    rectMode(CENTER);
    noStroke();

    fill (255);
    rect(x, y, 350);
    push();
        translate(70, 80);
        ellipse(x, y, 330);
    pop();
    push();
    translate(70, 80);
    triangle(0, 350, 350/2, 0, 350, 350);
    pop();
}
function draw() {

}
*/
let x = 0;
let y = 0; 
let angle = 0;

function setup() {
    createCanvas(800, 800);

    noStroke();
    fill(250, 230, 0);
    angleMode(DEGREES);
}
function draw() {
    background(0);

    // central 'sun' ellipse
    push();
    translate(400, 400);
    rotate(angle);
    ellipse(x, y, 85, 100);
    pop();

    // moon 1 ellipse
    push ();
        translate (400, 400);
        rotate (angle);
        fill(255, 0, 0);
        ellipse(x+100, y+100, 40, 50);
        angle = angle + 1;

            // moon 2 ellipse
            push();
                translate(x+100, y+100);
                rotate (angle);
                fill(0, 0, 255);
                ellipse(50, 50, 30, 35);
                angle = angle + 1;
            pop();

    pop ();

}