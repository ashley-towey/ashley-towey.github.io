let r, g, b, x, y, myButton;

function setup() {
    createCanvas(windowWidth, windowHeight);
    r = 200; 
    g = 200;
    b = 200;
    x = width/2;
    y = height/2;

    rectMode(CENTER);

}

function draw() {
    // create a button
    myButton = createButton('Change colour');
    myButton.position(x-50, y-100);
    myButton.mousePressed(myButtonClick);
    myButton.style('background', 'rgb(100, 150, 200)');
    background(r, g, b);

    // button that changes the shape in the center of the canvas
    push();
        fill(255);
        if (mouseIsPressed === true) {
            ellipse(x-50, y, 50, 50);
        } else {
            rect (x-50, y, 50, 50);
        }
    pop();
    // Key press to change the fill colour
    push();
        if(keyIsPressed === true && keyCode === 82) {
            fill(200, 0, 0);
        } else {
            fill(255);
        }
        textSize(18);
        text("key: " + keyCode, x+25, y+50); // display the key that is pressed
        rect(x+50, y, 50, 50);
    pop();
    push();
        if(keyIsPressed === true && keyCode === 39) {
            x += 10;
        } else if (keyIsPressed === true && keyCode === 37) {
            x -= 10;
        } else if (keyIsPressed === true && keyCode === 38) {
            y -= 10;
        } else if (keyIsPressed === true && keyCode === 40) {
            y += 10;
        }
}

function myButtonClick() {
    r = random(0, 255);
    g = random(0, 255);
    b = random(0, 255);
}