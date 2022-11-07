let url = 'https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.csv';
let table;

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
    let x = 70;
    let y = 50;

    for (let row = 0; row < rows; row ++) {
        let name = table.getString(row, 'place');
        let magnitude = table.getString(row, 'mag');
        ellipse(x, y, magnitude*12);

        // split the name into multiple lines
        // name = name.split(" ", 4);
        print(rows);

        text(name+'\n'+magnitude, x, y+25);

        // positioning of the x and y to increment
        x += width/3;
        if (x > width - 70) {
            y += 100;
            x = 50;
        }
    }

}