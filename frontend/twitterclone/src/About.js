import React from "react";
import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <div id="navbar">
        <div id="logo">
          <h1>TWITTER</h1>
        </div>

        <div id="links">
          {" "}
          <Link id="Link" to="/">
            Home
          </Link>
          <Link id="Link" to="/contact">
            Contact
          </Link>
          <Link id="Link" to="/about">
            About
          </Link>
          <Link id="Link" to="/posts">
            Posts
          </Link>
        </div>
      </div>

      <video height="600" width="100%" controls>
        <source src={require("./video/vid.mp4")} type="video/mp4" />{" "}
      </video>
    </div>
  );
}
