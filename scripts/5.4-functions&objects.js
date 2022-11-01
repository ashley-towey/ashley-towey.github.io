/* var bubble = {
    x: 300, 
    y: 200, 
    jitter: 10,

    display: function() {
        stroke(255);
        strokeWeight(4);
        noFill();
        ellipse(this.x, this.y, 24, 24);
    },
    move: function() {
        this.x = this.x + random (-this.jitter, this.jitter);
        this.y = this.y + random (-this.jitter, this.jitter);
    }
}

function setup() {
    createCanvas(windowWidth, windowHeight);
}

function draw() {
    background(0);

    bubble.move();
    bubble.display();
}
*/

//var mimage;
//var kimage;
var roo;

//We downloaded two images from the web and then uploaded
//both images into p5.
/*
function preload() {
  mimage = loadImage('amap.jpg');
  kimage = loadImage('roo.png');
}
*/
function setup() {
  createCanvas(620, 600);
  //Here's where we create the button.
  b = createButton("Show kangaroo migration");
  b.position(10, 10);
  b.mousePressed(migrate);
  //Here's where we tell p5 that the kangaroo is going to 
  //be something that coders call an object.  That means
  //that it's going to have lots of qualities, and it's 
  //going to behave based on certain rules.
  roo = new migrator();
  textSize(24);
}

//This function defines the qualities of the kangaroo and
//helps p5 understand how it's going to behave.  The
//kangaroo needs to know where it is, where it's going,
//whether or not it should be moving right now, etc.
function migrator() {
  this.startx = 200;
  this.starty = 150;
  this.endx = 400;
  this.endy = 300;
  this.moving = 0;
  this.mode = 1;
  //It takes a little bit of math to figure out how much
  //the x- and y-coordinates need to change in order for
  //the kangaroo to reach its destination.
  this.xchange = 0.8;
  this.ychange = 0.6;
  this.update = function() {
    //Depending on which direction the kangaroo is moving,
    //we need to either make the coordinates increase or
    //decrease.
    if (this.moving == 1) {
      if (this.mode == 1) {
        this.xchange = 0.8;
        this.ychange = 0.6;
      }
      if (this.mode == -1) {
        this.xchange = -0.8;
        this.ychange = -0.6;
      }
      this.startx = this.startx + this.xchange;
      this.starty = this.starty + this.ychange;
      //When the kangaroo reaches its destination, we need
      //to reset lots of things and get ready to go to the
      //other destination.
      if (abs(this.startx - this.endx) < 1) {
        if (this.mode == 1) {
          this.startx = 400;
          this.starty = 300;
          this.endx = 200;
          this.endy = 150;
        }
        if (this.mode == -1) {
          this.startx = 200;
          this.starty = 150;
          this.endx = 400;
          this.endy = 300;
        }
        this.moving = 0;
        this.mode = this.mode * -1;
      }
    }
  }
  this.show = function() {
    //Here's where we tell p5 to show the image of the 
    //kangaroo at its current location.
    fill (255, 0, 0);
    rect(this.startx, this.starty, 80, 80);
    //If we're at either destination right now, we should
    //show a label.
    if (this.startx == 200) {
    fill(0);
      text("WINTER", 200, 250);
    }
    if (this.startx == 400) {
      text("SUMMER", 400, 400);
    }
  }
}

function draw() {
  //The draw function is constantly telling the kangaroo
  //to update itself and put its image in the appropriate
  //location.
  background(255);
  image(mimage, 0, 0, 620, 600);
  roo.update();
  roo.show();
}

//When the kangaroo gets to its destination, we tell it to
//stop moving.  Pressing the button tells the kangaroo that
//it's time to move again.
function migrate() {
  roo.moving = 1;
}