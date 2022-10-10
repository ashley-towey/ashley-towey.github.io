/* Coding Challenge #3 */
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