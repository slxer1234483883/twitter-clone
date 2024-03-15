import React from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Home.js";
import About from "./About.js";
import Contact from "./Contact.js";
import Posts from "./Posts";
import Login from "./Login.js";
import ViewPosts from "./ViewPosts.js";
import Registration from "./Registration.js";
import Createposts from "./Createposts.js";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home></Home>,
    errorElement: <h1>PAGE NOT FOUND</h1>,
  },

  {
    path: "/about",
    element: <About></About>,
  },

  {
    path: "/contact",
    element: <Contact></Contact>,
  },

  {
    path: "/posts/:postId",
    element: <Posts></Posts>,
  },

  {
    path: "/posts",
    element: <ViewPosts></ViewPosts>,
  },

  {
    path: "/Login",
    element: <Login></Login>,
  },

  {
    path: "/registration",
    element: <Registration></Registration>,
  },

  {
    path: "createposts",
    element: <Createposts></Createposts>,
  },
]);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <RouterProvider router={router}></RouterProvider>
  </React.StrictMode>,
);
