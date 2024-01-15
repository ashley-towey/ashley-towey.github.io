// let variable;

// variables that control the 'wght' and 'opsz' of the font
// let Weight;
// let Aero;

// variables for the google sheets API
var idNum = '1j8z_HROnw6KDso52nrUP63gJ5D3AJbhbRy9y-MGxVqU';
var sheet_name = 'Responses';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + idNum + '/values/' + sheet_name + '?alt=json&key=' + key;

let testVar;
let rowCounter;
let inputData;
let outputData;


function setup() {
  noCanvas()
  
  // variable = select('.variable');

}

function draw() {
  background(220);
  
    // map the values from the cursor to the typeface input range
    // Aero = map(mouseX, 0+100, windowWidth - 100, 0, 100);
    // Weight = map(mouseY, 0+100, windowHeight - 100, 100, 0);

    // apply the value to the typeface
    // variable.style('font-weight', Weight);
   // variable.style('font-variation-settings', "'opsz' " + Aero);

    // this function checks if any button has been pressed and then refreshes if that happens
    document.body.addEventListener('keypress', refreshPage);
  
}

// functions from the google sheets API to process and write the data
function processData(rows) {
  let headers = rows[0];
  let content = 

  rows.shift();
  
  rows.forEach(row => {

    if (!row[1] || !row[2] || !row[3] || !row[4] || !row[5] || !row[6]) {
      return;
    }

    // recommendations
    document.getElementById('recommendation').innerHTML += "<p>Recommendation<p>";
    document.getElementById('recommendation').innerHTML += "<h4>"+ row[1] +"</h4>";
    document.getElementById('recommendation').innerHTML += "<img src='../project_stories/img/"+ row[2] + ".jpg' alt=' " + row[2] + "'>";
    document.getElementById('recommendation').innerHTML += "<p><a href=https://what3words.com/" + row[2] + ">" + row[2] + "</a></h3>";
    document.getElementById('recommendation').innerHTML += "<hr>";

    // encouragements
    document.getElementById('encouragement').innerHTML += "<p>Encouragement<p>";
    document.getElementById('encouragement').innerHTML += "<h4>"+ row[3] +"</h4>";
    document.getElementById('encouragement').innerHTML += "<img src='../project_stories/img/"+ row[4] + ".jpg' alt=' " + row[4] + "'>";
    document.getElementById('encouragement').innerHTML += "<p><a href=https://what3words.com/" + row[4] + ">" + row[4] + "</a></h3>";
    document.getElementById('encouragement').innerHTML += "<hr>";
    
    // story 
    document.getElementById('story').innerHTML += "<p>Story<p>";
    document.getElementById('story').innerHTML += "<h4>"+ row[5] +"</h4>";
    document.getElementById('story').innerHTML += "<img src='../project_stories/img/"+ row[6] + ".jpg' alt=' " + row[6] + "'>";
    document.getElementById('story').innerHTML += "<p><a href=https://what3words.com/" + row[6] + ">" + row[6] + "</a></h3>";
    document.getElementById('story').innerHTML += "<hr>";
  });
}

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));


function refreshPage(){
  location.reload();
}



