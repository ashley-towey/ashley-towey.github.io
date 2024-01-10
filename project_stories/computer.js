let variable;

// variables that control the 'wght' and 'opsz' of the font
let Weight;
let Aero;

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
  noCanvas()
  
  variable = select('.variable');

}

function draw() {
  background(220);
  
    // map the values from the cursor to the typeface input range
    Aero = map(mouseX, 0+100, windowWidth - 100, 0, 100);
    Weight = map(mouseY, 0+100, windowHeight - 100, 100, 0);

    // apply the value to the typeface
    variable.style('font-weight', Weight);
    variable.style('font-variation-settings', "'opsz' " + Aero);

    // this function checks if any button has been pressed and then refreshes if that happens
    document.body.addEventListener('keypress', refreshPage);
  
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
    content.innerHTML += "<h3>" + outputData[14] + "</h3>";
    content.innerHTML += "<small>" +outputData[15]+"</small>";
    content.innerHTML += "<h3><a href=https://what3words.com/" + outputData[16] + ">" + outputData[16] + "</a></h3>";
    content.innerHTML +=  "";

}

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));


function refreshPage(){
  location.reload();
}



