import React, { useState } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = async () => {
    console.log("username", username);
    console.log("password", password);
    try {
      const response = await fetch(
        `signin?username=${username}&password=${password}`
      );
      const data = await response.json();

      if (response.ok) {
        if (data.token === "login_OK") {
          sessionStorage.setItem("username", username);
          sessionStorage.setItem("loggedIn", true);
          props.setUsername(username)
          navigate("/");
        } else {
          alert("Login failed. Please check your username and password.");
        }
      } else {
        alert("Login failed. Please check your username and password.");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("An error occurred during login. Please try again.");
    }
  };

  return (
    <div className="d-flex justify-content-center mt-5">
      <div className="card h-auto" style={{ width: "500px" }}>
        <div className="card-body justify-content-center">
          <div className="card-title h3">Login</div>
            <div class="form-group mt-3">
              <label for="exampleInputEmail1">Username</label>
              <input
                className="form-control"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(event) => handleUsernameChange(event)}
              />
            </div>
            <div class="form-group mt-3">
              <label for="exampleInputPassword1">Password</label>
              <input
                className="form-control"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => handlePasswordChange(event)}
              />
            </div>
            <button class="btn btn-primary mt-3" onClick={handleLogin}>
              Login
            </button>
        </div>
      </div>
    </div>
  );
}
