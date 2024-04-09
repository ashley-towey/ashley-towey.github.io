// variables for the google sheets API
var idNum = '16Lh5IiiwGbdV8GtmRCJg-5qIizXX6ro23zYhqMQBSOE';
var sheet_name = 'Sheet1';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + idNum + '/values/' + sheet_name + '?alt=json&key=' + key;

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => displayMessage(data.values));

// function to display the last message from spectator
function displayMessage(rows) {
    //*** Organise all the information from the Google Sheet ***// 
    let headers = rows[0]; // returns array of all the headers
    console.log("Headers: " + headers); // logs the headers array

    let lastResponse = rows.length-1; // navigates to the last row in the spreadsheet
    let currentResponse = rows[lastResponse]; // returns the whole array of the last row
    let Message = currentResponse[1]; // returns the second string in the array = message
    let Contributor = currentResponse[2]; // returns the third string in array = contributor name
    console.log(Message + " : from " + Contributor); // logs the latest message and contributor

    //*** Display the Information from the Google Sheet ***//
    let content = document.getElementById('content'); // append the information to this div
    content.innerHTML += "<h1>" + Message + "</h1>"; // add the message
    content.innerHTML += "<h4>" + Contributor + "</h4>"; // add the contributor

}

    // setInterval(checkMessage, 1000); // set timer

function checkMessage(){
    console.log("help please");
}




  





