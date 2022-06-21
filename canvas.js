let canvas = document.querySelector("canvas");

canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


//tool is a api to draw graphics.
let tool = canvas.getContext("2d");
tool.fillStyle = "white";
tool.fillRect(0, 0, canvas.width, canvas.height);

let pencilColorCont = document.querySelectorAll(".pencil-color");
let pencilWidthElem = document.querySelector(".pencil-width");
let eraserWidthElem = document.querySelector(".eraser-width");
let download = document.querySelector(".download");
let redo = document.querySelector(".redo");
let undo = document.querySelector(".undo");
let del = document.querySelector(".delete");


let penColor = "red";
let eraserColor = "white";
let penWidth = pencilWidthElem.value;
let eraserWidth = eraserWidthElem.value;

let undoRedoTracker = []; //data
let track = 0;   //represent which action from tracker array



let mousedown = false;
//let mouseup = "false";



// tool.beginPath();  //new graphics
// tool.moveTo(10,10);  //start-point
// tool.lineTo(100,150);  //end
// tool.stroke(); //fill graphics


// tool.lineTo(200, 250); //continue path from old to new path
// tool.stroke(); //color of new path

tool.strokeStyle = penColor;
tool.lineWidth = penWidth;

//mousedown -> start new path
//mousemove --> path fill(fill graphics)
canvas.addEventListener("mousedown",(e)=>{
    mousedown = true;
    tool.beginPath();
    tool.moveTo(e.clientX, e.clientY);
})

canvas.addEventListener("mousemove", (e) =>{
    if(mousedown){
       tool.lineTo(e.clientX, e.clientY);
       tool.stroke();
    }

})

canvas.addEventListener("mouseup", (e) => {
    mousedown = false;

    let url = canvas.toDataURL();
    undoRedoTracker.push(url);
    track = undoRedoTracker.length-1;
})



del.addEventListener("click", (e) => {
    tool.fillStyle = "rgb(255, 255, 255)";
    tool.fillRect(0, 0, canvas.width, canvas.height);
})

undo.addEventListener("click", (e) => {
    if(track > 0)
        track--;
        let trackObj = {
            trackValue: track,
            undoRedoTracker
    
           }
        undoRedoCanvas(trackObj); 
})

redo.addEventListener("click", (e) => {
    if(track < undoRedoTracker.length - 1)    
       track++;
       let trackObj = {
        trackValue: track,
        undoRedoTracker

       }
       undoRedoCanvas(trackObj);      
})

function undoRedoCanvas(trackObj){
    track = trackObj.trackValue;
    undoRedoTracker = trackObj.undoRedoTracker;
  
    let url = undoRedoTracker[track];
    let img= new Image();
    canvas.getContext("2d").clearRect(0,0,canvas.width,canvas.height);
    img.src = url;
    img.onload = (e)=>{
      tool.drawImage(img,0,0,canvas.width,canvas.height);      //starting coordinate and ending coordinate
    }
  }


pencilColorCont.forEach((colorElem)=>{ 
    colorElem.addEventListener("click", (e) => {
        let color = colorElem.classList[0];
        penColor = color;
        tool.strokeStyle = penColor;
        //tool.lineWidth = penWidth;
    })

})

pencilWidthElem.addEventListener("change", (e) => {
    penWidth = pencilWidthElem.value;
    tool.lineWidth = penWidth;
})

eraserWidthElem.addEventListener("change", (e) => {
    eraserWidth = eraserWidthElem.value;
    tool.lineWidth = eraserWidth;
})

eraser.addEventListener("click", (e) => {
    if(eraserFlag){
        tool.strokeStyle = eraserColor;
        tool.lineWidth = eraserWidth;
    }
    else{
        tool.strokeStyle = penColor;
        tool.lineWidth = penWidth;
    }
})

download.addEventListener("click", (e) =>{
    let url  = canvas.toDataURL();
    //canvas.fillStyle = "white";
    let a = document.createElement("a");
    a.href = url;
    a.download = "myNotes.jpg";
    a.click();

})











