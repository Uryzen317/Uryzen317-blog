"use client";

import { useState } from "react";
import { api } from "@/app/statics";

export default function LikePost({ title }) {
  let [canLike, setCanLike] = useState(
    window.localStorage.getItem(title) || false
  );

  if (!canLike)
    return (
      <span
        className="font-bold cursor-pointer"
        onClick={() => like(title, setCanLike)}
      >
        Like this post
      </span>
    );
  return <span className="text-gray-500">You liked this post.</span>;
}

async function like(title, setCanLike) {
  let req = await fetch(api + "posts/" + title, {
    method: "Post",
    cache: "no-cache",
  });
  if (req.ok) {
    window.localStorage.setItem(title, "true");
    setCanLike(true);
  }
}
