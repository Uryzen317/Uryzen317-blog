'use client'

import { api } from "@/app/statics";

export default function () {
    let title;
    return (
        <div className="container bg-gray-700 my-4 p-2 text-gray-950 space-y-4 h-fit">
            Title: <input className="outline-none bg-gray-900 h-8 text-gray-300 px-2" onChange={() => { title = event.target.value }} />
            <br></br>
            <button className="w-24 outline-none bg-gray-900 h-8 text-gray-300 px-2" onClick={() => { createTopic({ title }) }}>topic</button>
        </div>
    )
}

async function createTopic({ title }) {
    let req = await fetch(api + 'topics', {
        method: 'PUT',
        body: JSON.stringify({
            title
        }),
        headers: {
            accessToken: window.localStorage.getItem('accessToken'),
            'Content-Type': 'application/json'
        }
    });
    let data = await req.json();
}