import React from "react";
import { useParams } from "react-router-dom";
import "./css/posts.css";
export default function Posts() {
  const params = useParams();
  console.log(params);
  return (
    <div>
      <h1>Posts {params.postId}</h1>
    </div>
  );
}
