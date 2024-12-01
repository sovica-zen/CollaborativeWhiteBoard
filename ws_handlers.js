const { get } = require("./routes")
const db = require('./database.js')

module.exports = (io, socket) => {

    const connected = () => {
      console.log("client connected")
    }
    
    const joinRoom = (roomData) => {
      socket.join(roomData.roomID)
      socket.username = roomData.username
      console.log("username of socket is: ", socket.username)
      console.log(roomData.username + " is trying to join room: " + roomData.roomID)
      console.log(io.of("/").adapter.rooms)

      for (room of socket.rooms){
        socket.to(room).emit("canvas_update_req")
        socket.broadcast.emit("new_user")
      }
      socket.emit("confirm_join")
    }

    const getUsers = (roomData) => {
      var room = socket.rooms
      console.log(room)
    }

    const coordinateUpdate = (coords) => {
      console.log(coords)
      console.log(...[socket.rooms])
      for (room of socket.rooms){
        socket.to(room).emit("coordinate_update", coords);
      }
      //socket.to(...[socket.rooms]).emit("coordinate_update", coords)
    }

    const beginPath = (coords) => {
      console.log("begin path")
      socket.broadcast.emit("begin_path", coords)
    }

    const endPath = (coords) => {
      console.log("end path")
      socket.broadcast.emit("end_path", coords)
    }

    const recieveImage = (imgData) => {
      db.insertImage(imgData)
      console.log(imgData);
    }
    
    const canvasUpdate = (dataURL) => {
      console.log("received canvas update request from: ", socket.username)
      for (room of socket.rooms){
        socket.to(room).emit("canvas_update", dataURL);
      }
    }


    socket.on("coordinate_update", coordinateUpdate)
    socket.on("begin_path", beginPath)
    socket.on("end_path", endPath)
    socket.on("connection", connected)
    socket.on("joinRoom", joinRoom)
    socket.on("save_image", recieveImage)
    socket.on("get_users", getUsers)
    socket.on("canvas_update", canvasUpdate)
}