function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER); //adjust the anchor point of text alignment to the horizontal and vertical centers
  textSize(20); //make the text 20 pixels in size
  frameRate(30);
}

function draw() {
  background(0);
  let words = ['Mail - Ashley Towey - Outlook', 'Netflix', 'Download My Virgin Media App | Virgin Media', '(179) Youtube', 'mismatch how design - Google Search', 'why do currency symbols have lines through them - Google Search', 'synonyms for personal - google search', 'Pinterest', 'pen plotter - Google Search', 'Training Expired ~ Central Saint Martins Loan Store ~ smarthub', 'Pinterest', 'Pinterest', 'Dashboard ~ Central Saint Martins Loan Store ~ smarthub', 'SM.00.H, Online Whiteboard for Visual Collaboration'];
  let word = random(words); // select random word
  for (let y = 0; y < height; y += 28) { //use a for loop to draw the line of text multiple times down the vertical axis
    fill(255);
    text(word, width / 2, y); //display text
  }
}