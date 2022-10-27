const cursor = document.getElementById("custom-cursor"); // calling the custom cursor id from the html document
document.body.setAttribute("onmousemove", "moveMe(event)"); // call mouse move functions and make an event to call back later

// move the cursor when page x and y change
function moveMe(event) { 
    cursor.style.left = (event.pageX)+'px';
    cursor.style.top = (event.pageY)+'px';
}


// testing if everything's running okay
console.log("all ok");