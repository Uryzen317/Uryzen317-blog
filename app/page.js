import LastPosts from "@/components/last-posts";
import LastUpdates from "@/components/last-updates";
import MostLiked from "@/components/most-liked";
import MostViewed from "@/components/most-viewed";
import Post from "@/components/post";
import Topics from "@/components/topics";
import Link from "next/link";

export default async function () {
  let posts = await fetch('http://localhost:3001/posts', { cache: 'no-cache' });
  posts = await posts.json();

  return (
    <div className="container flex gap-4 my-4 px-2">
      <div className="left-section hidden md:block md:basis-1/4 space-y-4">
        <LastPosts />
        <LastUpdates />
        <MostViewed />
        <MostLiked />
        <Topics />
      </div>
      <div className="right-section basis-full md:basis-3/4 flex flex-col gap-4" >
        <div className="site-map bg-gray-900 h-5 w-full px-2 flex items-center">
          <p className="text-gray-400 text-sm">Home {'>>'}</p>
        </div>
        {posts.map((post) => { return (<Link href={`post/${post.title}`}><Post {...post} /></Link>) })}
      </div>
    </div>
  )
}