let x = 1;

function printmsg(){
    let msg = 'Test ' + x;
    let p = document.createElement("p");
    p.innerHTML = msg;
    document.getElementsByTagName("body")[0].appendChild(p);
    console.log(msg);
    x = x + 1;
}
printmsg();
printmsg();
printmsg();