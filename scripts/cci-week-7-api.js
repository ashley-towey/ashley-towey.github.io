let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv';
let table;
let resetTime = 0;

function setup() {
    createCanvas(windowWidth, windowHeight);
    // load the dataset
    table = loadTable(url, 'csv', 'header');
}

function draw() {
    background(220);

    // grab the table data
    if (table.getRowCount()==0) return;
    let rows = table.getRowCount(); // get the number of rows in the table
    let x = 100;
    let y = 100;

    for (let row = 0; row < rows; row ++) {
        let name = table.getString(row, 'place');
        let magnitude = table.getString(row, 'mag');
        // draw and fill the circle with colour relative to the magnitude
        fillCol = map(magnitude, 0, 5, 0, 255);
        fill(fillCol, 0, 0);
        ellipse(x, y, magnitude*50);

        // split the name into multiple lines based on location and region
        fill(0);
        name1 = name.split(",")[0];
        name2 = name.split(",") [1];
        
        text(name1+'\n'+'Region: '+name2+'\n'+magnitude, x-magnitude*25, y+(magnitude*25)+20);

        // positioning of the x and y to increment
        x += width/3;
        if (x > width - 100) {
            y += 250;
            x = 100;
        }
    }

    // timer function to retrieve data every 60 seconds
    if(millis() > resetTime + 10000 || typeof table=="undefined") {
        table = loadTable(url, 'csv', 'header');
        // resetTime set to the current millisecond output
        resetTime = millis();
        console.log('sketch has successfully been reset\nTime of reset: '+resetTime);
     }

}