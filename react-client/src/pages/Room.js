import React, { useState, useRef, useEffect } from "react";
import { socket } from '../socket';
import { useNavigate } from "react-router-dom";
import "../page-styles/Home.css";



export default function Room(props) {
    const [roomID, setRoomID] = useState("default");
    const [username, setUser] = useState(sessionStorage.getItem("username"))
    const [users, setUsers] = useState()
    const navigate = useNavigate();
  
    React.useEffect(()=>{
      const handleJoinRoom = () => {
        navigate("/editor", )
      }
      socket.on("confirm_join", handleJoinRoom)
  },[])

  const openEditor = () =>{
    navigate('/editor')
  }


  if (props.type == 'create'){
    return (
      <div className="card p-3" style={{ width: "300px", height: "auto" }}>
        <div className="card-body d-flex flex-column justify-content-between">
          <h5 className="card-title">Create your own session</h5>
          <div className="card-text mb-3">
            Pick a name for your session and share it with your friends so
            they can join!
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="session name"
            onInput={e => setRoomID(e.target.value)}
          ></input>
          <div 
          className="d-flex btn btn-primary justify-content-center" 
          onClick={ (event) => {
            sessionStorage.setItem("roomID", roomID)
            socket.emit("joinRoom", {roomID: roomID, username: username})
            console.log(roomID)
          }}>
            Create
          </div>
        </div>
      </div>    
      );
  }
  else if (props.type == 'join'){
    return (
      <div className="card p-3" style={{ width: "300px", height: "auto" }}>
        <div className="card-body h-100 d-flex flex-column justify-content-between">
          <h5 className="card-title">Join an existing session</h5>
          <div className="card-text mb-3">
            Join a session using the session name!
          </div>
          <input
            type="text"
            className="form-control mb-3"
            placeholder="session name"
            onInput={e => setRoomID(e.target.value)}
          ></input>
          <div 
          className="d-flex btn btn-primary justify-content-center" 
          onClick={ (event) => {
            sessionStorage.setItem("roomID", roomID)
            socket.emit("joinRoom", {roomID: roomID, username: username})
            console.log(roomID)
          }}>
            Join
          </div>
        </div>
      </div>    
      );
  }
}


