
  function displayMessage(){
    let theMsg = document.getElementById("firstName"+"lastname").value;
    if (theMsg){
        document.getElementById("showinputhere").innerHTML = theMsg;
    }
    else{
        document.getElementById("showinputhere").innerHTML = "No data received";
    }
}
