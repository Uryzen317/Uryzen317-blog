'use client'

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import LastPosts from "@/components/last-posts";
import LastUpdates from "@/components/last-updates";
import MostLiked from "@/components/most-liked";
import MostViewed from "@/components/most-viewed";
import Topics from "@/components/topics";
import { api } from "@/app/statics";

export default function () {
    let [isOpen, setIsOpen] = useState(false);
    let accessToken;
    useEffect(() => {
        accessToken = window.localStorage.getItem('accessToken');
        console.log(accessToken ? 'user is logged in.' : 'please log in.');
    }, [])


    let user;

    return (
        <header className="w-full bg-gray-950 h-12 flex justify-center sticky top-0 left-0">
            <div className="header-container container flex justify-between px-2 items-center h-full">
                <Link href={'/'} className="left-section flex gap-2 items-center">
                    <Image className="w-10 h-10" src={"/logo.png"} width={100} height={100} alt="uryzen317 personal blog"></Image>
                    <h1 className="text-gray-300 text-lg md:text-xl truncate">Uryzen317 personal blog</h1>
                </Link>
                {!isOpen ? (
                    <div className="right-section-closed block md:hidden" onClick={() => { setIsOpen(!isOpen) }}>
                        <svg className="fill-gray-300 h-10 w-10" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M120-240v-60h520v60H120Zm678-52L609-481l188-188 43 43-145 145 146 146-43 43ZM120-452v-60h400v60H120Zm0-208v-60h520v60H120Z" /></svg>
                    </div>
                ) : (
                    <div className="right-section-open-container">
                        <div className="right-section-closed block md:hidden" onClick={() => { setIsOpen(!isOpen) }}>
                            <svg className="fill-gray-300 h-9 w-9" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 -960 960 960" width="48"><path d="M180-180h600v-600H180v600Zm-60 60v-720h720v720H120Zm216-174 144-144 144 144 42-42-144-144 144-144-42-42-144 144-144-144-42 42 144 144-144 144 42 42ZM180-180v-600 600Z" /></svg>
                        </div>
                        <div className="right-section-open md:hidden block space-y-4 absolute top-12 left-0 p-2 w-full bg-gray-500 border-2 border-gray-700">
                            <LastPosts />
                            <LastUpdates />
                            <MostViewed />
                            <MostLiked />
                            <Topics />
                        </div>
                    </div>
                )}

            </div>
        </header>
    )
}