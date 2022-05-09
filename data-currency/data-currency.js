let content = 'WELCOME TO THE INFINITE SCROLL '; //variable for text string
let yStart = 0; //starting position of the text wall
let customFont; //variable for custom font

function preload() {
  customFont = loadFont('SpaceMono-Regular.ttf'); //use  preload to load the custom font
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(customFont); //use the custom font for text display
  textAlign(CENTER, CENTER); //adjust the anchor point of text alignment to the horizontal and vertical centers
  textSize(20); //make the text 20 pixels in size
  //frameRate(20);
}

function draw() {
  background(0);
  // random text
  let words = ['Mail - Ashley Towey - Outlook', 'Netflix', 'Download My Virgin Media App | Virgin Media', '(179) Youtube', 'mismatch how design - Google Search', 'why do currency symbols have lines through them - Google Search', 'synonyms for personal - google search', 'Pinterest', 'pen plotter - Google Search', 'Training Expired ~ Central Saint Martins Loan Store ~ smarthub', 'Pinterest', 'Pinterest', 'Dashboard ~ Central Saint Martins Loan Store ~ smarthub', 'SM.00.H, Online Whiteboard for Visual Collaboration'];
  let word = random(words); // select random word
  for (let y = yStart; y < height; y += 28) { //use a for loop to draw the line of text multiple times down the vertical axis
    //fill(255, y / 2 + 55, 100); //create a gradient by associating the fill color with the y location of the text
    fill(255);
    text(word, width / 2, y); //display text
  }
  yStart--; //move the starting point of the loop up to create the scrolling animation, yStart-- is the same as yStart = yStart -1 or yStart-=1
}