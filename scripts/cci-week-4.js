/* Coding Challenge #2
Explore the blendMode() command by drawing a series of shapes 
on top of each other. 

Adjust their position on the canvas using the push() and pop() 
commands and translate() | rotate().

Hint: explore the commands blendMode(DIFFERENCE) and
blendMode(BLEND)
*/


let x = 400;
let y = 400;

function setup() {
createCanvas(800, 800);
blendMode(BLEND);

background(0);

noStroke();

blendMode(DIFFERENCE);

fill(255);

rectMode(CENTER);

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




