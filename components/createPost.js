"use client";

import React, { Component, useState } from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default function CreatePost({ ...topics }) {
  let desc, icon, lang, device;
  let [status, setStatus] = useState("");
  let [topic, setTopic] = useState("");
  let [title, setTitle] = useState("");

  return (
    <div className="container bg-gray-700 my-4 p-2 text-gray-950 space-y-4 h-fit">
      Title:{" "}
      <input
        className="outline-none bg-gray-900 h-8 text-gray-300 px-2"
        onChange={() => {
          setTitle(event.target.value);
        }}
      />
      <br></br>
      Topic:{" "}
      <select
        onChange={() => {
          setTopic(event.target.value);
        }}
      >
        {Object.keys(topics).map((key) => (
          <option value={topics[key].id} key={topics[key].id}>
            {topics[key].title} &nbsp; - &nbsp; {topics[key]._count.posts} posts
          </option>
        ))}
      </select>
      <br></br>
      Desc:
      <CKEditor
        editor={ClassicEditor}
        onChange={(event, editor) => {
          desc = editor.getData();
        }}
      />
      <br></br>
      Icon:{" "}
      <input
        type="file"
        className="w-60 outline-none bg-gray-900 h-8 text-gray-300 px-2"
        onChange={() => {
          icon = event.target.files[0];
        }}
      />
      <br></br>
      Language:{" "}
      <input
        className="w-60 outline-none bg-gray-900 h-8 text-gray-300 px-2"
        onChange={() => {
          lang = event.target.value;
        }}
      />
      <br></br>
      Device:{" "}
      <input
        className="w-60 outline-none bg-gray-900 h-8 text-gray-300 px-2"
        onChange={() => {
          device = event.target.value;
        }}
      />
      <br></br>
      <button
        className="w-24 outline-none bg-gray-900 h-8 text-gray-300 px-2"
        onClick={() => {
          createPost({ title, desc, icon, lang, device, topic, setStatus });
        }}
      >
        post
      </button>
      {status && <p className="text-red-500">{status}</p>}
    </div>
  );
}

async function createPost({
  title,
  desc,
  icon,
  lang,
  device,
  topic,
  setStatus,
}) {
  let form = new FormData();
  form.append("title", title);
  form.append("topic", topic);
  form.append("desc", desc);
  form.append("lang", lang);
  form.append("device", device);
  form.append("icon", icon, icon.name);

  let req = await fetch("http://localhost:3001/posts", {
    method: "PUT",
    headers: {
      accessToken: window.localStorage.getItem("accessToken"),
    },
    body: form,
  });

  if (req.ok) {
    await req.json();
    setStatus("OK");
  } else {
    setStatus(req.statusText);
  }
}
