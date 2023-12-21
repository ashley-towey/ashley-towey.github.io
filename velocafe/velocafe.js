let coffeeVal = 10; // need to use this later on to drive the interactions that are happening

let circleSize = 300;
let circleLocationX = 200; // controls the circles at the top
let circleLocationY = 200; // controls the circles at the top too

let ratingsLocationX = 180; // controls the ratings section below
let ratingsLocationY = 500; // controls the ratings section below too
let ratingsCircle = 75; // size of the smaller circles below

function setup() {
    createCanvas(windowWidth, windowHeight);
    layer2 = createGraphics(600, 600);

    // mode setups
    rectMode(CENTER);
    layer2.rectMode(CENTER);
    layer2.ellipseMode(CENTER);
    colorMode(HSB, 360, 100, 100, 100);
    colorMode(HSB, )
}

function draw() {
    background(255);
    layer2.background(255); // 2nd background

    // colour settings
    noStroke();
    
    // OVERALL VELOCAFE SCORE CIRCLES
    // coffee
    fill(231, 70, 51, 50);
    ellipse(circleLocationX, circleLocationY, circleSize);
    // cake
    fill(359, 89, 80, 50);
    ellipse(circleLocationX+circleSize/2, circleLocationY, circleSize);
    // safety
    fill(115, 68, 65, 50)
    ellipse(circleLocationX, circleLocationY+circleSize/2, circleSize);
    // welcoming
    fill(56, 100, 100, 50);
    ellipse(circleLocationX+circleSize/2, circleLocationY+circleSize/2, circleSize);
    
    // rectangle mask
    fill(0);
    // rect(windowWidth/2, windowHeight/2, windowWidth, windowHeight);
    layer2.erase();
        layer2.ellipse(circleLocationX+75, circleLocationY+75, circleSize);
    layer2.noErase();

    // display 2nd canvas as an image
    image(layer2, 0, 0);

    // SINGULAR SCORES FOR EACH VELOCAFE ELEMENT
    // coffee
    fill(231, 70, 51, 70);
    ellipse(ratingsLocationX, ratingsLocationY, ratingsCircle); 
    fill(0);
    text('Coffee Rating', ratingsLocationX+60, ratingsLocationY-10);
    text('This place is fantastic for coffee', ratingsLocationX+60, ratingsLocationY+10);

    // cake
    fill(359, 89, 80, 70);
    ellipse(ratingsLocationX, ratingsLocationY+100, ratingsCircle); 
    fill(0);
    text('Cake Rating', ratingsLocationX+60, ratingsLocationY+90);
    text('This place is fantastic for cake', ratingsLocationX+60, ratingsLocationY+110);

    // safety
    fill(115, 68, 65, 70)
    ellipse(ratingsLocationX, ratingsLocationY+200, ratingsCircle); 
    fill(0);
    text('Safety Rating', ratingsLocationX+60, ratingsLocationY+190);
    text('This place has safe bike storage', ratingsLocationX+60, ratingsLocationY+210);

    // welcoming
    fill(56, 100, 100, 70);
    ellipse(ratingsLocationX, ratingsLocationY+300, ratingsCircle); 
    fill(0);
    text('Welcomingness', ratingsLocationX+60, ratingsLocationY+290);
    text('This place is made for cyclists', ratingsLocationX+60, ratingsLocationY+310);

}


// code for bringing in the spreadsheet data

// var id = '109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg';
// var sheet_name = 'Responses';
// var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
// var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + sheet_name + '?alt=json&key=' + key;

// // https://docs.google.com/spreadsheets/d/109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg/edit#gid=1939700004

// function processData(rows) {
//   var headers = rows[0];
//   var content = document.getElementById('content');
//   rows.shift();

//   // console.log(rows[1]);

//   rows.forEach(row => {
//     console.log(row[1]);

//     content.innerHTML += "<p>" + "Coffee: " + row[1] + "</p>"; // coffee 
//     content.innerHTML += "<p>" + "Cake: " + row[2] + "</p>"; // cake
//     content.innerHTML += "<p>" + "Safety: " + row[3] + "</p>"; // safety
//     content.innerHTML += "<p>" + "Welcome: " + row[4] + "</p>"; // welcome

//     // previous information display here
//     // content.innerHTML += "<small>" + "Contributed by: " + row[0]+", "+ row[1] + ", of " + row[2] + "</small>";
//     // content.innerHTML += "<h1>"+row[3]+"</h1>";
//     // content.innerHTML += "<h3>"+"Location: "+row[4]+"</h3>";
//     // content.innerHTML += "<p>" + "Price: " + row[5] + "</p>";
//     // content.innerHTML += "<p>" + "Vibe: " + row[6] + "</p>";
//     // content.innerHTML += "<p>" + "Food: " + row[8] + "</p>";
//     // content.innerHTML += "<p>" + "Beer Garden: " + row[9] + "</p>";
//     // content.innerHTML += "<hr>";
//   });
// }
// //this gets the data from the google sheet
// fetch(url)
//   .then(response => response.json())
//   .then(data => processData(data.values));

