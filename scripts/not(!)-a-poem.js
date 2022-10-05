  function displayMessage(){
    let fName = document.getElementById("firstName").value;
    let lName = document.getElementById("lastName").value;

    if (fName + lName){
        document.getElementById("showinputhere").innerHTML = fName + lName;
    } else {
        document.getElementById("showinputhere").innerHTML = "Not enough data provided.";
    }
}