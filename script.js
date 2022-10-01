function myFunction(btn_id) {
  
  var btnText = document.getElementById(btn_id.id);
  var parentElem = btn_id.parentElement;
  var childElemP = parentElem.childNodes;
  var spanElem = childElemP[1].childNodes;
  
  if (spanElem[1].style.display === "none") {
    spanElem[1].style.display = "inline";
    btnText.innerHTML = "Read more"; 
    spanElem[2].style.display = "none";
  } else {
    spanElem[1].style.display = "none";
    btnText.innerHTML = "Read less"; 
    spanElem[2].style.display = "inline";
  }
}
