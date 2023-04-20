var id = '1QNGCvWaGR8FYQ_O1NJGALYS6sQwAXzLge6WkMO0lu4Q';
var sheet_name = 'what3pubs';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + sheet_name + '?alt=json&key=' + key;

function processData(rows) {
  var headers = rows[0];
  var content = document.getElementById('content');
  rows.shift();
  // console.log(headers, rows);

  rows.forEach(row => {
    // console.log(row);
    content.innerHTML += "<li>"+row+"</li>";
  });
}
//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => processData(data.values));


