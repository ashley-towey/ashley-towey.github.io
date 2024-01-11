let permissionGranted = false;
let weight;
let aero;

// load in the font
let font;

function preload() {
  font = loadFont('../data/AeroDynamicWeightSlantVF.ttf');
}

// variable to affect the HTML DOM element type
let variable;

// variables for the google sheets API
var idNum = '1j8z_HROnw6KDso52nrUP63gJ5D3AJbhbRy9y-MGxVqU';
var sheet_name = 'Responses_Duplicate';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + idNum + '/values/' + sheet_name + '?alt=json&key=' + key;

let testVar;
let rowCounter;
let inputData;
let outputData;

function setup() {
    noCanvas(); // just display the text directly onto the webpage
    
    variable = select('.variable');

    // DeviceOrientationEvent, DeviceMotion Event 
    if (typeof(DeviceOrientationEvent) !== 'undefined' && typeof(DeviceOrientationEvent.requestPermission) === 'function') {
        // ios 13 device
        DeviceOrientationEvent.requestPermission()
        .catch(() => {
            // show permission dialog only the first time
        let button = createButton("click to allow access to sensors");
        button.style("font-size", "24px");
        button.center();
        button.mousePressed( requestAccess );

        throw error;
        })
        .then(() => {
            // on any subsquent visits
            permissionGranted = true;
        })

    } else { 
        // non ios 13 device
        textSize(48);
        text("non ios 13 device", 100, 100);
         }

}

function requestAccess() {
    DeviceOrientationEvent.requestPermission()
    .then(response => {
        if (response == 'granted') {
            permissionGranted = true;
        } else {
            permissionGranted = false;
        }
    })
    .catch(console.error);

    this.remove();
}

function draw() {
    background(255);

    // rounding the numbers to make animation smooth
    let roundedX = round(rotationX);
    let roundedY = round(rotationY);

    // mapping the variability from the orientation to the typeface values
    let weight = map(roundedX, 0, 80, 0, 100);
    let aero = map(roundedY, -30, 30, 0, 100);


    variable.style('font-weight', weight);
    variable.style('font-variation-settings', "'opsz' " + aero);

    if (!permissionGranted) return;

    // // testing text below /////
    // textSize(30);
    // text("Rotation X: " + roundedX, 100, 100);
    text("Rotation Y: " + roundedY, 100, 200);
    text("weight: " + weight, 100, 300);
    text("CDA: "+ aero, 100, 400);
}

// functions from the google sheets API to process and write the data
function processData(rows) {
    let headers = rows[0];
    let content = document.getElementById('content');
    rows.shift();
  
    rowCounter = round(random(0, rows.length - 1)); // finds a random number that is relevant and displays that information. 
    console.log(headers);
  
    let inputData = rowCounter;
    let outputData = rows[inputData];
    
      // write the information from the google sheet to the html page
      document.getElementById('type').innerHTML += "<h3>" + outputData[14] + "</h3>";
      content.innerHTML += "<small>" +outputData[15]+"</small>";
      // content.innerHTML += "<h3><a href=https://what3words.com/" + outputData[16] + ">" + outputData[16] + "</a></h3>";
      document.getElementById('location-information').innerHTML += "<h3><a href=https://what3words.com/" + outputData[16] + ">" + outputData[16] + "</a></h3>";
      // background image auto fetches based on the what3words
      // below will bring back the background image
      document.body.style.backgroundImage = "url('../project_stories/img/" + outputData[16] + ".png')"; 
  }
  
  //this gets the data from the google sheet
  fetch(url)
    .then(response => response.json())
    .then(data => processData(data.values));
