import React, { useState, useRef, useEffect } from "react";
import "../page-styles/Editor.css";
import { socket } from "../socket";
import { io } from "socket.io-client";
export default function EditorPage(props) {
  const canvasRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [size, setSize] = useState(5);
  const [imgName, setImgName] = useState("myImg")


  const colors = [
    "#FF0000",
    "#0000FF",
    "#FFFF00",
    "#00FF00",
    "#FFA500",
    "#800080",
  ];

  const handleColorChange = (event) => {
    setColor(event.target.value);
  };

  const handleSizeChange = (event) => {
    setSize(event.target.value);
  };


  const receiveCanvas = (dataURL) => {
    var img = new Image();
    img.src = dataURL;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);
  }

  const sendCanvas = () => {
    socket.emit("canvas_update", canvasRef.current?.toDataURL("image/jpeg"))
  }

  React.useEffect(() => {
    //socket.on("connect", () => console.log(socket.id));
    socket.on("coordinate_update", handleCoordUpdate);
    socket.emit("joinRoom", {roomID: sessionStorage.getItem("roomID"), username: sessionStorage.getItem("username")})
    socket.on("canvas_update", receiveCanvas)
    socket.on("canvas_update_req", sendCanvas)

    //set background to white
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    return ()=>{
      socket.off(handleCoordUpdate)
      // socket.off(receiveCanvas)
      // socket.off(sendCanvas)
    }
  }, []);

  const handleCoordUpdate = (coordData) => {
    var canvas = canvasRef.current;
    var ctx = canvas.getContext("2d");
    if (coordData.eventType === "begin_path") {
      ctx.beginPath();
      ctx.strokeStyle = coordData.color;
      ctx.lineWidth = coordData.size;
      ctx.lineCap = "round";
      ctx.moveTo(
        coordData.x - canvas.offsetLeft,
        coordData.y - canvas.offsetTop
      );
    }
    if (coordData.eventType === "move") {
      ctx.lineTo(
        coordData.x - canvas.offsetLeft,
        coordData.y - canvas.offsetTop
      );
      ctx.stroke();
    }
  };

  const handleSendImage = (dataURL, name) => {
    const author = sessionStorage.getItem("username")
    const pub = 1
    //const name = name
    socket.emit("save_image", {author: author, dataURL: dataURL, public: pub, name: name});
  };

  const handleUserConnect = (username) => {
    socket.on("")
  }

  const handleCanvasMouseDown = (event) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.moveTo(
      event.clientX - canvas.offsetLeft,
      event.clientY - canvas.offsetTop
    );
    socket.emit("coordinate_update", {
      x: event.clientX,
      y: event.clientY,
      color: color,
      size: size,
      eventType: "begin_path",
    });

    canvas.addEventListener("mousemove", handleCanvasMouseMove);

    function handleCanvasMouseMove(event) {
      ctx.lineTo(
        event.clientX - canvas.offsetLeft,
        event.clientY - canvas.offsetTop
      );
      ctx.stroke();

      socket.emit("coordinate_update", {
        x: event.clientX,
        y: event.clientY,
        color: color,
        size: size,
        eventType: "move",
      });
    }

    canvas.addEventListener("mouseup", handleCanvasMouseUp);

    function handleCanvasMouseUp() {
      socket.emit("coordinate_update", {
        x: event.clientX,
        y: event.clientY,
        color: color,
        size: size,
        eventType: "end_path",
      });
      canvas.removeEventListener("mousemove", handleCanvasMouseMove);
      canvas.removeEventListener("mouseup", handleCanvasMouseUp);
    }
  };


  const userCard = (props) => {
    return (
        <div className="card" style={{width: "400px", height: "auto"}} onClick={() => {}}>
            <div className="card-body">
                <h5 className="card-title">{props}</h5>
            </div>
        </div>
    );
};

  function showUsers (users) {
    return(
      <div className="w-20">
          <h1 className="mt-2">users</h1>
          <div>
              {users.map((usr) => userCard(usr))}
          </div>
      </div> 
    );
  }

  const handleImgNameChange = (event) => {
    setImgName(event.target.value);
  };

  function downloadImg(){
    let downloadLink = document.createElement('a');
    downloadLink.setAttribute('download', `${imgName}.jpg`);
    let canvas = canvasRef.current;
    let dataURL = canvas.toDataURL('image/jpeg');
    let url = dataURL.replace(/^data:image\/jpeg/,'data:application/octet-stream');
    downloadLink.setAttribute('href', url);
    downloadLink.click();
  }
  

  return (
    <div>
      <div className="d-flex flex-row align-items-center justify-content-around">
        <div className="d-flex flex-row align-items-center mx-3">
          <label htmlFor="color-input">Color:</label>
          <input
            style={{ height: "50px", width: "50px" }}
            type="color"
            id="color-input"
            value={color}
            onChange={(event) => handleColorChange(event)}
          />
        </div>
        <div className="d-flex flex-wrap">
          {colors.map((color) => (
            <div
              className="color-box m-1"
              style={{
                width: "50px",
                height: "50px",
                backgroundColor: color,
                border: "2px solid black",
                borderRadius: "5px"
              }}
              onClick={() => setColor(color)}
            ></div>
          ))}
        </div>
        <div className="d-flex flex-row align-items-center">
          <label htmlFor="size-input">Size:</label>
          <input
            type="range"
            id="size-input"
            min={1}
            max={20}
            value={size}
            onChange={(event) => handleSizeChange(event)}
          />
        </div>
        <div>
          <input
            type="text"
            className="form-control mt-3"
            id="imgName"
            placeholder="image name"
            value={imgName}
            onChange={(e) => handleImgNameChange(e)}
          />
          <div>
            <input
              type="button"
              className="btn btn-primary m-3"
              id="saveGallery"
              value={"save to gallery"}
              onClick={(event) => {
                console.log(canvasRef.current?.toDataURL("image/jpeg"));
                handleSendImage(canvasRef.current?.toDataURL("image/jpeg"), imgName);
                //socket.emit("get_users", {roomID: sessionStorage.getItem("roomID"), username: sessionStorage.getItem("username")})
              }}
            />
            <input
              type="button"
              className="btn btn-primary"
              id="saveLocal"
              value={"save to disk"}
              onClick={downloadImg}
            />
          </div>
        </div>
      </div>
      <div className="">
      <canvas
        ref={canvasRef}
        width={600}
        height={600}
        style={{ border: "5px solid black" }}
        onMouseDown={handleCanvasMouseDown}
      />
      </div>
    </div>
  );
}
