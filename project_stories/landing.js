// let variable;

// variables that control the 'wght' and 'opsz' of the font
// let Weight;
// let Aero;

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
  let content = document.getElementById('recommendation');

  rows.shift();
  
  rows.forEach(row => {

    // write the content to the page
    content.innerHTML += "<p>"+ row[14] +"<p>";
    content.innerHTML += "<h4>"+ row[15] +"</h4>";
    content.innerHTML += "<p><a href=https://what3words.com/" + row[16] + ">" + row[16] + "</a></h3>";
    content.innerHTML += "<hr>";
    // TRYING TO ADD AN IMAGE FOR EACH HERE, TRY AGAIN LATER
    // content.innerHTML.src += "'../project_stories/img/_road.jpeg'";
    // document.body.style.backgroundImage = "url('../project_stories/img/" + row[16] + ".png')"; 
    // document.getElementById("landscape").src = "../project_stories/img/_road.jpeg"; 
    
  });
}

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));


function refreshPage(){
  location.reload();
}



