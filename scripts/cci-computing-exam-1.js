// function setup() {
//     createCanvas(400, 400);
// }

// function draw() {
//     background(200);

    /* For loop question

    for (let i = 0; i < 5; i++) { 
        console.log('This is: '+i);
    }
    */
    /*************
    Take a long hard look back at question 5, the one about JSON Objects
    *************/

    /************
     * JSON Object Example from the internet
    {  
        "employee": {  
            "name":       "sonoo",   
            "salary":      56000,   
            "married":    true  
        }  
    }  
    */

    /************
     * Question 9 Example test
     */    /*
    I believe the answer to question 9 should be both c. and d. because in order for it to work both need to be changed. 
     */ 
//     function setup() {
//         createCanvas(400, 400);
//         strokeWeight(1);
//         let i = 0.0; /* i must also be declared as a global variable */ 
//         let direction = "F";

//     }
//     function draw() {
//         background(0) /* Error here no ';' */
//         // rectMode(CENTER);
//         rect (200, 200, i*30, 64);
//         if (direction=="expand") {
//             i+= 0.1;
//         }else{
//             i = i-0.1; 
//         }
//         if(i > 5.0){
//             direction = "expand" /* These need to be swapped around */

//         }
//         if(i < 0.1){
//             direction="contract"


//     }
// }

/* Question 10 Example Code */

// let xB= 0;
// let yB = 0;
// let xBvel = 5;
// let yBvel = 3;

// let counter = 0;

// function setup() {
//     createCanvas (400, 400);
// }

// function draw() {
// background(0,0,0);
// fill(0,205,255);
// noStroke();
// let ellipseB = ellipse(xB, yB, 70, 70)

// xB += xBvel;
// if((xB < 0) || (xB >= 400 )) {
// xBvel = -xBvel;
// }
// yB += yBvel;
// if((yB < 0) || (yB >= 400) ){
// yBvel = -yBvel;
// }

// counter +=  1;
// console.log('xB: '+xB + '    Counter: '+counter);

// }

/* Question 13 */
// let size = 80;
// function setup() { 
//     createCanvas (400, 400); 
//     background (0);
//     noFill();
// }
// function draw() {
// for (let i = 0; i < 5; i++) {
// stroke(random(255), random (255), random (255)) ;
// ellipse(width / 2, height / 2, size*i, size*i);
// }
// }

/* Question 14 */
// var x = 40;
// var y = 260;
// var speed = 3;
// function setup() {
// createCanvas (600, 450);
// stroke(82, 200, 200);
// strokeWeight(22);
// }
// function draw() {
// background (200, 255, 100);
// fill(255, 0, 0, 2);
// triangle(x, 180, x, 390, y, 290);
// x = x + speed;
// y = y + speed;
// if (y > width || x < 0) {
// speed = speed * - 1;
// fill(255, 255, 255);
// rect (195, 195, 10, 10);
// }
// }

window. setTimeout ( function( ){
    console. log( 'Hello world');
    }, 2000);