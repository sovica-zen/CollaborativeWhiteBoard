// za pošiljanje koordinat med klienti
function printMousePos(event) {
    var x = event.offsetX
    var y = event.offsetY
    socket.emit("coordinates", {'x': x, 'y': y})
    console.log({'x': x, 'y':y})
}

function printMousePosDrag(event) {
    if (mouseDown){
        var x = event.offsetX
        var y = event.offsetY
        socket.emit("coordinate_update", {'x': x, 'y': y, 'color':'red', 'size': 5})
        console.log({'x': x, 'y': y, 'color':'red', 'size': 5})
    }
}

function coordinateUpdate(coords){
    console.log("recieved coordinates: " + JSON.stringify(coords))
    var item = document.createElement('li');
    item.textContent = JSON.stringify(coords);
    document.getElementById('coordlist').appendChild(item);
    window.scrollTo(0, document.body.scrollHeight);
}

var mouseDown = 0;
document.onmousedown = function() { 
    mouseDown = 1;
}
document.onmouseup = function() {
    mouseDown = 0;
}

socket.on("coordinate_update", coordinateUpdate);



document.addEventListener("mousedown", printMousePos);
document.addEventListener("mousemove", printMousePosDrag);
 