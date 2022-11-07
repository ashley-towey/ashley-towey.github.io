/*function setup() {
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
*/

let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv';
let table;

function setup() {
    createCanvas(500, 450);
    // load the dataset
    table = loadTable(url, 'csv', 'header');

    // copy of volcano setup 
    rectMode(CENTER);
    noStroke();

}

function draw() {
    background(220);

    // grab the table data
    if (table.getRowCount()==0) return;
    let rows = table.getRowCount(); // get the number of rows in the table
    let x = 70;
    let y = 50;

    for (let row = 0; row < rows; row ++) {
        let name = table.getString(row, 'place');
        let magnitude = table.getString(row, 'mag');
        //ellipse(x, y, magnitude*12);

        // split the name into multiple lines
        // name = name.split(" ", 4);
        // print(rows);

        drawVolcano(x, y, magnitude);
        fill(255);
        text(name+'\n'+magnitude, x - 50 , y+65);

        // positioning of the x and y to increment
        x += width/3;
        if (x > width - 70) {
            y += 150;
            x = 50;
        }
    }

}

function drawVolcano(x,y,size) {

    // Draw rectangle for sky
    fill(135, 206, 235); // sky colour
    rect(x + 15, y + 15, width/3, 150);
  
    // Draw rectangle for foreground
    fill(0,128,0); // grass colour
    rect(x + 15, y + 70, width/3, 35);
  
    // Draw the volcano
    for (let i = 0; i<4; i++) {
      fill(139,69,19);
      ellipse(x + 10, 30 + y + (i*10), 20 + (i*10), 5 + (i*10));
    }
  
     // A loop to animate smoke bubbles
     for (let i = 0; i<6; i++) {
  
      // Create a colour for the smoke bubble 
      smokeColour = color(255,255,255);
      // Set the transparency to a semi random shade
      smokeColour.setAlpha(random(100,200) - (i*10));
      
      fill(smokeColour);
      xpos = x + (i*10);
      // Create a variable to hold the x position of the smoke bubble
      ellipse(map(noise(xpos), 0, 1, x - 25, x + 25), 30 + y - (i*10), (i*10) * size/2, (i*10) * size/2);
    }
  
  
  }