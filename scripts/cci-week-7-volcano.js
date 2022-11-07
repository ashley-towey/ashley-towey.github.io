function setup() {
    createCanvas(windowWidth, windowHeight);
    // rectMode(CENTER);
    noStroke();
}

function draw() {
    background(200);

    drawVolcano(0, 0, 1);
}

function drawVolcano(x, y, size) {
    // draw the sky
    fill (135, 206, 235);
    rect(x, y, width/3, height/3);

    // draw the foreground
    fill(0, 128, 0);
    rect(x, y + height/3 - height/9, width/3, height/9);

    // draw volcano
    for (let i = 0; i < 4; i++) {
        fill(50);
        ellipse(width/3-(width/3)/2, height/3-(height/3)/2.2 + y + (i*10), width/3-(width/3)/1.5 + (i*10), (height/3)/3 + (i * 10));
    }

    // draw smoke
    for (let i = 0; i < 6; i++) {
        smokeColour = color(255);
        smokeColour.setAlpha(random(100, 200));
        fill(smokeColour);

        xPos = width/3-(width/3)/2 + (i*10);
        ellipse(map(noise(xPos), 0, 1, width/3-(width/3)/2 - 25, width/3-(width/3)/2 + 25), 100 + y - (i*10), (i*10) + size/2);
    }
}