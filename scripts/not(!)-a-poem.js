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

    counter.innerHTML = days+"d"+hours+"h"+minutes+"m"+seconds+"s";
}, 1000) 
}

function displayData(){
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;

    if (fName + lName){
        document.getElementById("showinputhere").innerHTML = fName + lName;
    } else {
        document.getElementById("showinputhere").innerHTML = "Not enough data provided.";
    }
}