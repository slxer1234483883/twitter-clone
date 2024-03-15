import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import "./css/login.css";

export default function Login() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginErr, setLoginErr] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };

  const handleFormData = async (e) => {
    try {
      e.preventDefault();
      const response = await axios.post("http://localhost:3000/login", {
        username: username,
        password: password,
      });
      if (response.status === 200) {
        localStorage.setItem("jwtToken", response.data.token);
        console.log(response.data.token);
        navigate("/posts");
      }
    } catch (error) {
      console.log(error);
      setLoginErr("Invalid Username or Password");
    }
  };
  return (
    <div>
      <div id="navbar">
        <div id="logo">
          <h1>TWITTER</h1>
        </div>

        <div id="links">
          {" "}
          <Link id="Link" to="/posts">
            Home
          </Link>
          <Link id="Link" to="/contact">
            Contact
          </Link>
          <Link id="Link" to="/about">
            About
          </Link>
          <Link id="Link" to="/login">
            Login/SignUp
          </Link>
        </div>
      </div>

      <div id="box">
        <div id="formbox">
          <form onSubmit={handleFormData}>
            <label>Username: </label> <br /> <br />
            <input
              type="text"
              value={username}
              onChange={handleUsername}
            ></input>{" "}
            <br />
            <br></br>
            <label>Password:</label> <br /> <br />
            <input
              type="password"
              value={password}
              onChange={handlePassword}
            ></input>{" "}
            <br />
            <br></br>
            <button>Submit</button>
            <span id="reg">
              <p>
                New User? <a href="/registration">SignUp</a>
              </p>
            </span>
          </form>
          <h2>{loginErr}</h2>
        </div>
      </div>
    </div>
  );
}
