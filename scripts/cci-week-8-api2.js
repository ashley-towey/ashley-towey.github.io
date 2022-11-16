let weatherjson = false; 
let weatherloaded = 0; 
let counter = 0; 
let yr, ukdate; 
let theta = 0.0; // Calculating speed of waves
let img;
let amplitude = 10.0;

function setup() {
  createCanvas(600, 600);
  setInterval(countdown, 1000); // Call 'setcounter' every second
  img = loadImage('../img/cci-wk8/temp.png'); 
}

function countdown(){
  // Variables to work with in the rest of the script
  let m = month();
  let d = day();
  counter--; 

  // Timer to load JSON data every 30 seconds
  if(counter<0){
    // Reset countdown to 30 secs
    counter = 30;        
    yr = int(random(1963, 2022));
    // Build date strings for the API URL and to draw
    let apidate = `${yr}-${m}-${d}`;
    ukdate = `${d}-${m}-${yr}`;
    // Build the weather URL (see https://open-meteo.com/en/docs#api_form) 
    let weatherurl = "https://archive-api.open-meteo.com/v1/era5?";
    weatherurl += `latitude=51.5002&longitude=-0.1262`;
    weatherurl += `&start_date=${apidate}&end_date=${apidate}`;
    weatherurl += "&daily=temperature_2m_max,rain_sum&timezone=auto";
    // Load the JSON
    loadJSON(weatherurl, loadedweather); 
  }
}

// Called once the JSON is loaded 
function loadedweather(json){
  weatherjson = json; 
  weatherloaded++; 
}


function draw() {
  // Draw a white background
  background(255);

  // If the JSON hasn't loaded then don't go any further
  if(weatherjson===false) return;

  // Otherwise get the date, temp, and rain
  let temp = weatherjson.daily.temperature_2m_max;
  let rain = weatherjson.daily.rain_sum;

  // Add gradiated image to the background
  let pos = map(temp, -20, 40, -500, 0);
  image(img, 0, pos); // Position is linked to the temp

  // Draw the counters 
  fill(255);
  textSize(10);
  text("Frames: "+frameCount, width-150-55, 18+8);
  text("Counter: "+counter, width-90-45, 18+8);
  text("Loaded: "+weatherloaded, width-25-45, 18+8);

  // Draw the date, temp, and rainfall text
  let x = 10;
  let y = 30;
  textAlign(LEFT);
  text(`  Date: ${ukdate}`, x, y);
  text(`  Temp:  ${temp}°C`, x, y+15);
  text(`  Rain:  ${rain}mm`, x, y+30);

  // Draw some waves 
  noStroke();
  fill(43, 142, 240);
  y = height-height/2;
  speed = map(rain, 0, 15, 0.01, 0.09); // Map rain to wave speed
  newwave(y, 8/*spacing of circles*/,  60.0/*length of wave*/, speed);      // Ypos, spacing, freq
  newwave(y+100, 8,  180.0, speed);  // Ypos, spacing, freq
  newwave(y+200, 8,  360.0, speed); // Ypos, spacing, freq
}

// Derived from:  https://p5js.org/examples/math-sine-wave.html
function newwave(ypos, xspace, freq, speed){
  let dx = (TWO_PI/freq)*xspace;        // Calc wave frequency 
  let w = floor((width+xspace)/xspace); // Calc spacing
  let yvals = new Array(w);             // Store height values
  theta += speed;                       // Calc speed of all waves

  // For every x value calculate a y value with sine function
  let x = theta;
  for (let i=0; i < yvals.length; i++) {
    yvals[i] = sin(x)*amplitude; // Height of wave
    x += dx;
  }

  // Draw the wave with an ellipse at each location
  for (let x = 0; x<yvals.length; x++) {
    ellipse(x*xspace, ypos+yvals[x], 8, 8);
  }
}

/* 
let weatherJSON = false; 
let weatherLoaded = 0;
let counter = 0; 
let yr, ukDate; // yr shorthand for year
let theta = 0.0; // calculating speed of the waves 
let img;


function setup() {
    createCanvas(600, 600); // oooooh a canvas that may or may not be square
    setInterval(countdown, 1000); // first asynchronous operation
    img = loadImage('../img/cci-wk8/temp.png'); // another asynchronous operation
}

function draw() {
    background(230, 80, 80); // and a fucking background, fuck
    textSize(8);
    text('Frames: '+ frameCount, width-175, 18);
    text('Counter: '+ counter, width-115, 18);
    text('Loaded: '+ weatherLoaded, width-50, 18);

    if(weatherJSON === false) return; // cancel out if the weather has not been loaded

    // Otherwise get the date, temp, and rain
    let temp = weatherJSON.daily.temperature_2m_max;
    let rain = weatherJSON.daily.rain_sum;

    let pos = map(temp, -20, 40, -700, 0);
    // image(img, 0, pos);

    // Draw the date, temp, and rainfall text
    let x = 10;
    let y = 30;
    textAlign(LEFT);
    text(`  Date: ${ukDate}`, x, y);
    text(`  Temp:  ${temp}°C`, x, y+15);
    text(`  Rain:  ${rain}mm`, x, y+30);

    // Draw some waves
    noStroke();
    fill(43, 142, 240);
    y = height-100;   
    speed = map(rain, 0, 15, 0.01, 0.09); // Map rain to wave speed
    mywave(y, 9,  30.0, speed);      // Ypos, spacing, freq, speed
    mywave(y+40, 11,  60.0, speed);  // Ypos, spacing, freq, speed
    mywave(y+70, 13,  150.0, speed); // Ypos, spacing, freq, speed
}

// Developed from:  https://p5js.org/examples/math-sine-wave.html
function newwave(ypos, xspace, freq, speed){
    let dx = (TWO_PI/freq)*xspace;        // Calc wave frequency 
    let w = floor((width+xspace)/xspace); // Calc spacing
    let yvals = new Array(w);             // Store height values
    theta += speed;                       // Calc speed of all waves
  
    // For every x value calculate a y value with sine function
    let x = theta;
    for (let i=0; i < yvals.length; i++) {
      yvals[i] = sin(x)*10.0; // Height of wave
      x += dx;
    }
  
    // Draw the wave with an ellipse at each location
    for (let x = 0; x<yvals.length; x++) {
      ellipse(x*xspace, ypos+yvals[x], 8, 8);
    }
  }

function countdown() { // relates to setInterval()
    let m = month();
    let d = day();

    counter --; // could use this as an easier way of doing a countdown 

    if (counter < 0) { // countdown to a point, then up to 30 seconds again
        counter = 30;
        yr = int(random(1963, 2022)); // pick a random date as an integer
        // Build date strings for the API URL 
        let apiDate = `${yr}-${m}-${d}`;       // Create a date string in the form of 2022-11-09
        ukDate = `${d}-${m}-${yr}`;            // Create a UK date string in the form of 09-11-2022    
	    // Build the weather URL 
        let weatherURL = "https://archive-api.open-meteo.com/v1/era5?";
        weatherURL += `latitude=51.5002&longitude=-0.1262`;               // Lat and lon for London
        weatherURL += `&start_date=${apiDate}&end_date=${apiDate}`;       // Start and end dates
        weatherURL += "&daily=temperature_2m_max,rain_sum&timezone=auto"; // Request temperature and rain
       
        // Retrieve the JSON from the 'weatherurl, then call loadedweather()
        loadJSON(weatherURL, loadedWeather); 
    }
}

function loadedWeather(json) {
    weatherJSON = json;
}
*/
// See https://open-meteo.com/en/docs#api_form 