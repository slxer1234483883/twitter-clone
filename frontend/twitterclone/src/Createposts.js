import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./css/createPost.css";

export default function CreatePost() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleContentChange = (e) => {
    setContent(e.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const token = localStorage.getItem("jwtToken");
      if (!token) {
        setError("Authentication token is missing");
        return;
      }
      const response = await axios.post(
        "http://localhost:3000/createposts",
        {
          title: title,
          content: content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      if (response.status === 201) {
        navigate("/posts");
      } else {
        setError("Failed to create post");
      }
    } catch (error) {
      console.log(error);
      setError("Error creating post, please try again later");
    }
  };

  const handleLogout = (e) => {
    localStorage.removeItem("jwtToken");
    console.log("LOGGED OUT");
    navigate("/login");
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
          <Link id="Link" to="/" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>

      <div id="formBox">
        <form onSubmit={handleSubmit}>
          <div>
            <label>Title:</label>
            <br />
            <input
              type="text"
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
          <div>
            <label>Content:</label>
            <br />

            <textarea
              value={content}
              onChange={handleContentChange}
              rows="10"
              cols="60"
            ></textarea>
            <br />
            <br />
          </div>
          <button type="submit">Submit</button>
        </form>
        {error && <div>{error}</div>}
      </div>
    </div>
  );
}
