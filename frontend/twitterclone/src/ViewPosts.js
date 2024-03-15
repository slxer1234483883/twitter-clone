import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, Navigate, useNavigate } from "react-router-dom";
import "./css/posts.css";
export default function ViewPosts() {
  const [apiData, setApiData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [apiError, setApiError] = useState(false);
  const [username, setUsername] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    if (localStorage.getItem("jwtToken")) {
      (async () => {
        try {
          const response = await axios.get("http://localhost:3000/posts", {
            headers: {
              authorization: "Bearer " + localStorage.getItem("jwtToken"),
            },
          });
          setApiData(response.data);
          setLoading(false);
        } catch (error) {
          setApiError(true);
        }
      })();
    } else {
      navigate("/login");
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("jwtToken");
    console.log("LOGGED OUT");
    navigate("/login");
  };

  const handleDeletePost = async (postId) => {
    try {
      await axios.delete(`http://localhost:3000/posts/${postId}`, {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      const response = await axios.get("http://localhost:3000/posts", {
        headers: {
          authorization: "Bearer " + localStorage.getItem("jwtToken"),
        },
      });
      setApiData(response.data);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };
  const result = apiData.map((data) => (
    <div id="posts">
      <h1>{data.title}</h1>
      <h4>{data.content}</h4>
    </div>
  ));

  if (apiError) return <h1>Something went wrong</h1>;
  if (loading) return <h1>LOADING.................</h1>;
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
          <Link id="Link" to="/createposts">
            Create a post
          </Link>
          <Link id="Link" to="/contact">
            Contact
          </Link>
          <Link id="Link" to="/about">
            About
          </Link>
          <Link id="Link" onClick={handleLogout}>
            Logout
          </Link>
        </div>
      </div>

      <div id="res">{result}</div>
    </div>
  );
}
