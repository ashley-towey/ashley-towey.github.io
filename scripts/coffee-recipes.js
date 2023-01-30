let equipment = ["V60", "AeroPress", "Dedica EC685"]; // need to become an array to accomodate more options
let ratio = [16, 6, 2]; // make array shortly
let water = 250;

testArray = 0;

function setup() {
    createCanvas(400, 400);
    // console.log(water/ratio[testArray]);
}

function draw() {
    background(240);

    // if (equipment == "V60") {
    text('Method: ' + equipment[testArray], 10, 30);
    text('Ratio: 1:' + ratio[testArray], 10, 50);
    text('Water: ' + water + 'ml', 10, 70);
    text('Coffee: ' + water/ratio[testArray] + 'g', 10, 90);
    // }
}