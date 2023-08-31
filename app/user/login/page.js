'use client'

import { useRouter } from "next/navigation";
import { useState } from "react";
let router;

export default function () {
    let [username, setUsername] = useState('');
    let [password, setPassword] = useState('');
    router = useRouter();

    return (
        <form className="my-4 space-y-4 text-gray-900">
            Username : <input className="w-60 outline-none bg-gray-700 h-8 text-gray-300 px-2" onChange={() => { setUsername(event.target.value) }} />
            <br></br>
            Password : &nbsp;<input className="w-60 outline-none bg-gray-700 h-8 text-gray-300 px-2" onChange={() => { setPassword(event.target.value) }} />
            <br></br>
            <button className="w-24 outline-none bg-gray-700 h-8 text-gray-300" type="button" onClick={() => { login(username, password) }}>Login</button>
        </form>
    )
}

async function login(username, password) {
    let req = await fetch('http://localhost:3001/user/login', {
        method: 'POST',
        headers: {
            'Content-type': 'application/json'
        },
        body: JSON.stringify({ username, password }),
        cache: "no-cache",
    })
    if (req.ok) {
        let data = await req.json();
        window.localStorage.setItem('accessToken', data.accessToken);
        router.push('/')
    }
}