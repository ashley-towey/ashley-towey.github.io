// Feature Extractor Regression
// Adapted from The Coding Train by Daniel Shiffman https://thecodingtrain.com/learning/ml5/3.2-feature-extractor-regression.html
// (This sketch is not working in safari)

let mobilenet;
let predictor;
let video;
let value = 0;
let slider;
let addButton;
let trainButton;
let loadButton;
let colR;
let colG;
let colB;

function modelReady() {
  console.log('Model is ready!!!');
}

function customModelReady() {
  console.log('Custom Model is ready!!!');
  predictor.predict(gotResults);
}

function videoReady() {
  console.log('Video is ready!!!');
}

function whileTraining(loss) {
  if (loss == null) {
    console.log('Training Complete');
    predictor.predict(gotResults);
  } else {
    console.log(loss);
  }
}

function gotResults(error, result) {
  if (error) {
    console.error(error);
  } else {
    // updated to work with newer version of ml5
    // value = result;
    value = result.value;
    predictor.predict(gotResults);
  }
}

function setup() {
  createCanvas(320*2, 270*2);
  video = createCapture(VIDEO);
  video.hide();
  background(0);
  mobilenet = ml5.featureExtractor('MobileNet', modelReady);
  predictor = mobilenet.regression(video, videoReady);

  slider = createSlider(0, 1, 0.5, 0.1);

  addButton = createButton('add example image');
  addButton.mousePressed(function() {
    predictor.addImage(slider.value());
  });

  trainButton = createButton('train');
  trainButton.mousePressed(function() {
    predictor.train(whileTraining);
  });

  saveButton = createButton('save');
  saveButton.mousePressed(function() {
    predictor.save();
  });

  loadButton = createButton('load model');
  loadButton.mousePressed(function() {
    predictor.load('../data/model.json', customModelReady); // Loading in the model. Place model.json in same folder as sketch.js 
  });
}

function draw() {
  background(0);
  image(video, 0, 0, 320*2, 240*2);
  rectMode(CENTER);

  // map the value to the slider value
  colR = map(value, 0, 1, 0, 255);
  colB = map(value, 0, 1, 255, 0);
  // colB = col;
  
  fill(colR, 0, colB);
  ellipse(value * width, height / 2, 200, 260);
  // eye whites
  fill(255);
  ellipse(value * width + 20, height / 2, 20, 20);
  ellipse(value * width - 20, height / 2, 20, 20);
  fill(0);
  ellipse(value * width + 20, height / 2, 5, 20);
  ellipse(value * width - 20, height / 2, 5, 20);

  fill(255);
  textSize(16);
  text(value, 10, height - 10);
}
