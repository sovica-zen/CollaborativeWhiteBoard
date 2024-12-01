import React, { useState, useEffect, Component } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";
import { socket } from "./socket";
import EditorPage from "./pages/Editor.js";
import GalleryPage from "./pages/Gallery.js";
import HomePage from "./pages/Home.js";
import "./App.css";
import LoginPage from "./pages/Login";
import SignupPage from "./pages/Signup";

export default function App() {
  const [loggedIn, setLoggedIn] = useState(sessionStorage.getItem("loggedIn"));
  const [username, setUsername] = useState();
  if (!sessionStorage.getItem("username")) {
    sessionStorage.setItem("username", "anonymous");
  }
  //useEffect(setUsername(sessionStorage.getItem("username")), []);
  useEffect(() => {
    function onConnect() {
      console.log(socket.id);
    }
    socket.on("connect", onConnect);
    //sessionStorage.setItem("username", "Luka");


    setUsername(sessionStorage.getItem("username"));
    setLoggedIn(sessionStorage.getItem("loggedIn"))
    sessionStorage.setItem("roomID", "default");
    // console.log(username);
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  useEffect(() =>{
    const onStorage = () => {
      setUsername(sessionStorage.getItem('username'));
    };
    window.addEventListener('storage', onStorage)
  })


  function ShowLoggedIn(props){
    const navigate = useNavigate();
    function signOut(){
      sessionStorage.setItem("loggedIn", false)
      sessionStorage.setItem("username", "anonymous")
      setUsername("anonymous")
      //useEffect(() => { setValue(props.usr) }, [props.usr]);
      //navigate("/login")
      //this.forceUpdate()
    }
    
    return username !== "anonymous" ? (
      <div className="me-3 d-flex flex-row align-items-center">
        <div className="me-3">{username}</div>
        <div className="ms-auto btn btn-danger p-2" onClick={signOut}>Sign Out</div>
      </div>
    ) : <div></div>
  }

  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand navbar-light bg-light sticky-top">
          <Link className="navbar-brand ms-3" to="/">
            MIT-Draw
          </Link>
          <Link className="nav-link" to="/">
            Home
          </Link>
          <Link className="nav-link" to="/editor">
            Editor
          </Link>
          <Link className="nav-link" to="/gallery">
            Gallery
          </Link>
    
        <div className="ms-auto d-flex flex-row">
              <ShowLoggedIn />
              <div className="ms-auto me-3 btn btn-primary p-0">
                <Link
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/login"
                >
                  Login
                </Link>
              </div>
              <div className="ms-auto me-3 btn btn-primary p-0">
                <Link
                  style={{ color: "white" }}
                  className="nav-link"
                  to="/signup"
                >
                  Sign Up
                </Link>
              </div>
        </div>
          
        </nav>
        {/* Routes */}
        <Routes>
          <Route path="/editor" element={<EditorPage setUsername={setUsername}/>} />
          <Route path="/gallery" element={<GalleryPage setUsername={setUsername}/>} />
          <Route path="/login" element={<LoginPage setUsername={setUsername}/>} />
          <Route path="/signup" element={<SignupPage setUsername={setUsername}/>} />
          <Route path="/" element={<HomePage setUsername={setUsername}/>} />
        </Routes>
      </div>
    </Router>
  );
}
