// let firstName = document.getElementsByName("fName")[0].value;
// let myName = 'Ashley';
// let lastName = 'Towey';

/* function formChanged() {
    var firstName;
    var lastName;
}*/

/* function myFunction(myName) {
    console.log(myName + ' has passed the diploma in creative computing');
    console.log('hello world');
  }*/
/*
  let name = document.getElementsByName("fName")[0].value;
  // let firstName = 'Ashley';
  let lastName = 'Towey';

  let x = 1;

  function printmsg(){
     let msg = firstName;
     msg += " " + lastName;
     msg += ", I've asked you "
     msg += x+' times ';
     msg += 'if you are ok!!';
     let p = document.createElement("p");
     p.innerHTML = msg;
     document.getElementsByTagName("body")[0].appendChild(p);
     x = x+1;
  }*/

  // display message function
  function displayMessage(){
    let themsg = document.getElementById("msg").value;
    if (themsg){
        document.getElementById("showinputhere").innerHTML = themsg;
    }
    else{
        document.getElementById("showinputhere").innerHTML = "No message set";
    }
}
