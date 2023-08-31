import { api } from "@/app/statics";
import CreatePost from "@/components/createPost";

export default async function () {
  let req = await fetch(api + "topics", { cache: "no-cache" });
  let topics = await req.json();

  console.log(topics);

  return <CreatePost {...topics} />;
}
