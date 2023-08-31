import { api } from "@/app/statics";
import Link from "next/link";

export default async function () {
  let req = await fetch(api + "posts/" + "last-posts", { cache: "no-cache" });
  let topics = await req.json();

  return (
    <div className="main-container">
      {/* header */}
      <div className="header bg-gray-950 h-6 w-full px-1 flex items-center">
        <p className="text-sm font-bold text-gray-300">Last posts</p>
      </div>

      {/* items */}
      {topics.map((topic) => (
        <Link href={"topic/" + topic.title}>
          <div className="item bg-gray-800 h-6 cursor-pointer w-full px-1 flex items-center justify-between border-b border-gray-600 hover:bg-gray-700">
            <p className="text-xs text-gray-300">{topic.title}</p>
            <p className="text-xs text-gray-300 font-bold">
              @ {new Date(topic.createdAt).getFullYear()}/
              {new Date(topic.createdAt).getMonth()}/
              {new Date(topic.createdAt).getDate()}-
              {new Date(topic.createdAt).getHours()}:
              {new Date(topic.createdAt).getMinutes()}:
              {new Date(topic.createdAt).getSeconds()}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}
