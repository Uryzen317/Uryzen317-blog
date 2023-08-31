import Link from 'next/link'
import Post from "@/components/post";
import { api } from '@/app/statics';

export default async function ({ params }) {
    let req = await fetch(api + 'topics/' + params.title, { cache: 'no-cache' });
    let topic = await req.json();

    return (
        <div className="main-container container">
            <div className="site-map bg-gray-900 h-5 w-full px-2 flex items-center my-4">
                <p className="text-gray-400 text-sm">Home {'>>'} {topic.title} {'>>'}</p>
            </div>

            <div className="body flex flex-col gap-4" >
                {topic.posts.map((post) => { return (<Link href={'/post/' + post.title}><Post {...post} /></Link>) })}
            </div>
        </div>
    )
}