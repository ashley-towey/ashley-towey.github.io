var id = '109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg';
var sheet_name = 'Responses';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + sheet_name + '?alt=json&key=' + key;

// https://docs.google.com/spreadsheets/d/109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg/edit#gid=1939700004

function processData(rows) {
  var headers = rows[0];
  var content = document.getElementById('content');
  rows.shift();

  // console.log(rows[1]);

  rows.forEach(row => {
    console.log(row[1]);

    content.innerHTML += "<p>" + "Coffee: " + row[1] + "</p>"; // coffee 
    content.innerHTML += "<p>" + "Cake: " + row[2] + "</p>"; // cake
    content.innerHTML += "<p>" + "Safety: " + row[3] + "</p>"; // safety
    content.innerHTML += "<p>" + "Welcome: " + row[4] + "</p>"; // welcome

    // previous information display here
    // content.innerHTML += "<small>" + "Contributed by: " + row[0]+", "+ row[1] + ", of " + row[2] + "</small>";
    // content.innerHTML += "<h1>"+row[3]+"</h1>";
    // content.innerHTML += "<h3>"+"Location: "+row[4]+"</h3>";
    // content.innerHTML += "<p>" + "Price: " + row[5] + "</p>";
    // content.innerHTML += "<p>" + "Vibe: " + row[6] + "</p>";
    // content.innerHTML += "<p>" + "Food: " + row[8] + "</p>";
    // content.innerHTML += "<p>" + "Beer Garden: " + row[9] + "</p>";
    // content.innerHTML += "<hr>";
  });
}
//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));

