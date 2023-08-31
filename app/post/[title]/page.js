import { api } from "@/app/statics";
import LikePost from "@/components/likePost";
import topics from "@/components/topics";
import Image from "next/image";

export default async function ({ params }) {
  let req = await fetch(api + "posts/" + "post/" + params.title, {
    cache: "no-cache",
  });
  let data = await req.json();
  let {
    id,
    title,
    desc,
    lang,
    createdAt,
    updatedAt,
    updatedBy,
    device,
    likes,
    views,
    icon,
    author /* just username */,
    topic,
  } = data;

  // time interceptors
  createdAt = new Date(createdAt);
  createdAt = `${createdAt.getFullYear()}/${createdAt.getMonth()}/${createdAt.getDate()}-${createdAt.getHours()}:${createdAt.getMinutes()}:${createdAt.getSeconds()}`;

  if (updatedAt) {
    updatedAt = new Date(updatedAt);
    updatedAt = `${updatedAt.getFullYear()}/${updatedAt.getMonth()}/${updatedAt.getDate()}-${updatedAt.getHours()}:${updatedAt.getMinutes()}:${updatedAt.getSeconds()}`;
  }

  // name interceptors
  let usernameFirstLetter = author.username.split("")[0].toUpperCase();
  author.username = author.username.split("");
  author.username.shift();
  author.username = usernameFirstLetter + author.username.join("");

  if (updatedBy?.username) {
    let updatedByFirstLetter = updatedBy.username.split("")[0].toUpperCase();
    updatedBy.username = updatedBy.username.split("");
    updatedBy.username.shift();
    updatedBy.username = updatedByFirstLetter + updatedBy.username.join("");
  }

  return (
    <div className="main-container container">
      <div className="site-map bg-gray-900 h-5 w-full px-2 flex items-center my-4">
        <p className="text-gray-400 text-sm">
          Home {">>"} {topic.title} {">>"} {title} {">>"}
        </p>
      </div>

      <div className="body w-full h-fit p-2 bg-gray-800 space-y-2 ">
        <div className="top-section flex flex-wrap gap-4">
          {/* src={`http://localhost:3001/download/${icon}`} */}
          <Image
            className="w-72 h-48 border border-gray-500"
            src={api + "download/" + icon}
            width={200}
            height={150}
            alt={title}
          ></Image>
          <div className="details space-y-4">
            <h1 className="text-gray-300 text-4xl">{title}</h1>

            <div className="like-box flex gap-4 text-gray-400">
              <p>
                {views} views | {likes} likes | <LikePost title={title} />
              </p>
            </div>

            <p className="text-gray-500 text-sm">
              Written by {author.username} | in [{lang}] | at {createdAt} | on{" "}
              {device}{" "}
              {updatedAt
                ? `| updated at ${updatedAt} | by ${updatedBy.username}`
                : ""}
            </p>
          </div>
        </div>
        <div
          className="main-section text-justify justify-evenly text-gray-300"
          dangerouslySetInnerHTML={{ __html: desc }}
        ></div>
      </div>
    </div>
  );
}
