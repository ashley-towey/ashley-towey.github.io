let angle = 0;
let h = 240;
let s = 50;
let b = 50;
// let bgCol = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noStroke();
    // background colour changes colour of blue
    colorMode(HSB);

    // initiate day with button
    btnDay = createButton("Day");
    btnDay.position(50, height-175);
    btnDay.mousePressed(theDay);

    // create night with button
    btnNight = createButton("Night");
    btnNight.position(50, height-150);
    btnNight.mousePressed(theNight);

    // slider to rotate night and day movement
    slider = createSlider(0, 180, 0);
    slider.position(50, height-100);
    slider.style('width', '200px');

    // watch a full days rotation
    btnCycle = createButton("24 Hours");
    btnCycle.position(50, height-125);
    /*
    btnCycle.mousePressed(dailyCycle);
    */
}

function draw() {
    background(h, s, b);

    push();
        translate(width/2, height/2);
        rotate(angle);
        fill(60, 100, 100);
        ellipse(0, -100, 100, 100);

        fill(0, 0, 39.2);
        ellipse(0, 100, 100, 100);
        // draw stars
        drawStars();
    pop();

    // draw the ground
    fill (350, 28, b);
    rect (0, height/2, width, height/2);

    angle = slider.value();

    b = map(angle, 0, 180, 100, 40);

    console.log(angle);
}

function theDay() {
    angle = 0;
    slider.value(0);
}

function theNight() {
    angle = 180;
    slider.value(180);
}

// create a function to watch the day go by
/*
function dailyCycle() {
    for (let i = 0; i < 360; i++) {
        angle = i;
    }*
    for (let i = 0; i < 360; i++) {
        console.log(i);
        angle = i;
      }
}
*/

function drawStars() {
    for (let i = 0; i < 100; i++) {
        let x = random(-width, width);
        let y = random(0, height);
        fill (60, 100, 100, 50);
        ellipse(x, y, 2);
    }
}