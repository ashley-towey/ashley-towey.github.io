let xPos = 5;
let xStep = 15;
let fillCol; // background colour variable
let c;

function setup() {
    createCanvas(600, 600);
    rectMode(CENTER);

    fillCol = [color('#c0392b'), color('#e67e22'), color('#f1c40f'), color('#2ecc71'), color('#3498db'), color('#8e44ad')]; // an array of fill colours

}

function draw() {
    background(200);

    for(let i = 0; i < width/xStep; i++){
        noStroke();
            for(let j = 0; j > fillCol.length; j++){
                c = Math.round(random(0, 5)); // random circle colour
                fill (color(fillCol[c+j]));

            }

        factor = i/10;
        let yPos = map(noise(factor), 0, 1, 0, height); // use perlin noise for the y value
        rect(xPos+(xStep*i), yPos, xStep, xStep); // draw the rectangle

    }


}
