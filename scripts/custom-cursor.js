const cursor = document.querySelector('.custom-cursor');
    
// Custom cursor follow the default cursor
document.addEventListener('mousemove', e => {
    cursor.setAttribute('style', 'top: '+(e.pageY - 10)+'px; left: ' +(e.pageX - 10)+'px;')
});

const links = document.querySelectorAll('a');

// Custom cursor change style on hover links
for(let x of links) {

    x.addEventListener('mouseenter', () => {
     cursor.classList.add('hover');
    });

    x.addEventListener('mouseleave', () => {
     cursor.classList.remove('hover');
    });
        
}

/* const cursorRounded = document.querySelector('.rounded');
const cursorPointed = document.querySelector('.pointed');

let prevX = null;
let prevY = null;


const moveCursor = (e)=> {
  const mouseY = e.clientY;
  const mouseX = e.clientX;
   
  cursorRounded.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
  
  cursorPointed.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
 
}

window.addEventListener('mousemove', moveCursor);
*/
/*
let prevX = null
let prevY = null

// How thick the lines should be
ctx.lineWidth = 5

window.addEventListener("mousemove", (e) => {
    // initially previous mouse positions are null
    // so we can't draw a line
    if(prevX == null || prevY == null){
        // Set the previous mouse positions to the current mouse positions
        prevX = e.clientX
        prevY = e.clientY
        return
    } 

    // Current mouse position
    let currentX = e.clientX
    let currentY = e.clientY

    // Drawing a line from the previous mouse position to the current mouse position
    ctx.beginPath()
    ctx.moveTo(prevX, prevY)
    ctx.lineTo(currentX, currentY)
    ctx.stroke()

    // Update previous mouse position
    prevX = currentX
    prevY = currentY
})
*/