import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/contact.css";
export default function Contact() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [query, setQuery] = useState("");
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleUsername = (event) => {
    setUsername(event.target.value);
  };
  const handleEmail = (event) => {
    setEmail(event.target.value);
  };
  const handleQuery = (event) => {
    setQuery(event.target.value);
  };
  const handleFormData = async (e) => {
    e.preventDefault();
    try {
      if (!username || !email || !query) {
        setError("All fields are required.");
        return;
      }

      const response = await axios.post("http://localhost:3000/contact", {
        name: username,
        email: email,
        query: query,
      });
      if (response.status === 201) {
        setSuccessMessage("Form submitted successfully!");
        setUsername("");
        setEmail("");
        setQuery("");
        setError("");
      }
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again later.");
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
        </div>
      </div>

      <div id="formSubmission">
        {" "}
        {error && <p style={{ color: "red" }}>{error}</p>}
        {successMessage && <p style={{ color: "green" }}>{successMessage}</p>}
        <form onSubmit={handleFormData}>
          <label>name</label>
          <br />
          <input type="text" value={username} onChange={handleUsername}></input>
          <br />
          <br />
          <label>email</label>
          <br />
          <input type="text" value={email} onChange={handleEmail}></input>
          <br />
          <br />
          <label>Query</label>
          <br />
          <textarea
            rows="5"
            cols="50"
            value={query}
            onChange={handleQuery}
          ></textarea>
          <br />
          <br />
          <button type="submit">SUBMIT</button>
        </form>
      </div>
    </div>
  );
}
