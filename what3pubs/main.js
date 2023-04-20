var id = '1hYu36_X0pmoUFSHooBS8d8zYDjHUdFt5w9b-_KD19Dc';
var sheet_name = 'DGU_Recent';
var key = "AIzaSyB5b_wv4yQMDoHTCDDZydcbYxLZ5ISrGbQ"
var url = 'https://sheets.googleapis.com/v4/spreadsheets/' + id + '/values/' + sheet_name + '?alt=json&key=' + key;

//this gets the data from the google sheet
fetch(url)
  .then(response => response.json())
  .then(data => console.log(data));
