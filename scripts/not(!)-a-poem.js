document.getElementById("local_time").addEventListener('change', timechanged);

function timechanged(){
let startingDate = new Date(this.value).getTime();
let counter = document.querySelector('.countup-timer');

setInterval(function() {
    let newDate = new Date().getTime();
    let finalDate = newDate - startingDate;

    let days = Math.floor(finalDate / (1000 * 60 * 60 * 24));
    let hours = Math.floor((finalDate % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutes = Math.floor((finalDate % (1000 * 60 *60)) / (1000 * 60));
    let seconds = Math.floor((finalDate % (1000 * 60)) / 1000);

    counter.innerHTML = days+" days "+hours+" hours "+minutes+" minutes "+seconds+" seconds ";
}, 1000) 
}

function displayUserLifespan(){
    let firstName = document.getElementById("fName").value;
    let lastName = document.getElementById("lName").value;

    if (firstName + lastName){
        document.getElementById("showinputhere").innerHTML = firstName + " " + lastName + " has been alive for";
    } else {
        document.getElementById("showinputhere").innerHTML = "Not enough data provided.";
    }
}

/* 
function changeBgCol() {
    let bgCol = parseInt(document.getElementById("slider-output").value);
    // let bgCol = document.getElementById("slider-output");

    document.body.style.backgroundColor = rgb(bgCol + ',' + bgCol + ',' + bgCol);
}
*/