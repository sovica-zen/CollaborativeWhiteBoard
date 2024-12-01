import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";



//import "../page-styles/Login.css"

export default function SignupPage(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch(`signup?username=${username}&password=${password}`);
      const data = await response.json();

        if (data.token === "login_OK"){
          sessionStorage.setItem('username', username);
          sessionStorage.setItem("loggedIn", true);
          props.setUsername(username)
          navigate("/")
        }
        else {
          alert(data.error);
        }
      } 
      catch (error) {
        console.error('Error during signup:', error);
        alert('An error occurred during signup. Please try again.');
    }
  };
  

  return (
    <div
      className="d-flex justify-content-center mt-5"
      // style={{ border: "1px red dotted" }}
    >
      <div className="card h-auto"  style={{width: "500px"}}>
        <div className="card-body justify-content-center">
          <div className="card-title h3">Sign up</div>
            <div class="form-group mt-3">
              <label for="exampleInputEmail1">Username</label>
              <input className="form-control" type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
            </div>
            <div class="form-group mt-3">
              <label for="exampleInputPassword1">Password</label>
              <input className="form-control" type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
            </div>
            <button class="btn btn-primary mt-3" onClick={handleSignUp}>
              Sing up
            </button>
        </div>
      </div>
    </div>
    // <div class="login">
    // <h2 class="">Signup</h2>
    // <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} />
    // <br />
    // <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
    // <br />
    // <button onClick={handleSignUp}>Sign up</button>
    // </div>    
  );
}
