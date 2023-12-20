var id = '109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg';
var sheet_name = 'Responses';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + sheet_name + '?alt=json&key=' + key;

// https://docs.google.com/spreadsheets/d/109tXvHUr4BLUZqmbtEqL939k6MOoP2kh4EINguaO7fg/edit#gid=1939700004

function processData(rows) {
  var headers = rows[0];
  var content = document.getElementById('content');
  rows.shift();

  console.log(rows);

  rows.forEach(row => {
    content.innerHTML += "<small>" + "Contributed by: " + row[0]+", "+ row[1] + ", of " + row[2] + "</small>";
    content.innerHTML += "<h1>"+row[3]+"</h1>";
    content.innerHTML += "<h3>"+"Location: "+row[4]+"</h3>";
    content.innerHTML += "<p>" + "Price: " + row[5] + "</p>";
    content.innerHTML += "<p>" + "Vibe: " + row[6] + "</p>";
    content.innerHTML += "<p>" + "Food: " + row[8] + "</p>";
    content.innerHTML += "<p>" + "Beer Garden: " + row[9] + "</p>";
    content.innerHTML += "<hr>";
  });
}
//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));

