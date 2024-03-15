import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const handleUsername = (event) => {
    setUsername(event.target.value);
  };

  const handlePassword = (event) => {
    setPassword(event.target.value);
  };
  const handleFormData = async (event) => {
    try {
      event.preventDefault();
      const response = await axios.post("http://localhost:3000/registration", {
        username: username,
        password: password,
      });

      if (!username || !password) {
        setErr("username and password required");
        return;
      }
      if (response.status === 201) {
        navigate("/login");
      }
    } catch (error) {
      setErr("Internal server error");
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
                Existing User? <a href="/login">Login</a>
              </p>
            </span>
          </form>
          <h4>{err}</h4>
        </div>
      </div>
    </div>
  );
}
