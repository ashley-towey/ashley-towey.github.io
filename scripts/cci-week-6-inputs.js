let angle = 0;
let h = 240; // hue
let s = 50; // saturation
let b = 50; // brightness

function setup() {
    createCanvas(windowWidth, windowHeight);
    angleMode(DEGREES);
    noStroke();
    // background colour changes colour of blue
    colorMode(HSB); // declare a new colour colour mode to address brightness easily

    // frameRate(1);
    // initiate day with button
    btnDay = createButton("Day");
    btnDay.position(50, height-175);
    btnDay.mousePressed(theDay);

    // create night with button
    btnNight = createButton("Night");
    btnNight.position(50, height-150);
    btnNight.mousePressed(theNight);

    // slider to rotate night and day movement
    slider = createSlider(0, 180, 0);
    slider.position(50, height-100);
    slider.style('width', '200px');

}

function draw() {
    background(h, s, b);

    push();
        translate(width/2, height/2);
        rotate(angle);
        fill(60, 100, 100);
        ellipse(0, -100, 100, 100);

        fill(0, 0, 39.2);
        ellipse(0, 100, 100, 100);
        // draw stars
        //drawStars();
    pop();

    // draw the ground
    fill (350, 28, b);
    rect (0, height/2, width, height/2);

    angle = slider.value();

    b = map(angle, 0, 180, 100, 40);

    // 

    // console.log(angle);
}

function theDay() {
    angle = 0;
    slider.value(0);
}

function theNight() {
    /*
    if(angle < 180) {
        for(let i = 0; i < 180; i++){
            angle = angle + 1;
            slider.value(angle);
            console.log(angle);
        }*/
        slider.value(180);
    //}
    // angle = 180;
}

function drawStars() {
    for (let i = 0; i < 100; i++) {
        let x = random(-width, width);
        let y = random(0, height);
        fill (60, 100, 100, 50);
        ellipse(x, y, 2);
    }
}