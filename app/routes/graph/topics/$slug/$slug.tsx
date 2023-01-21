import type { LoaderArgs } from "@remix-run/node";
import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";

import { getTopic } from "~/models/topic.server";

export const loader = async ({ params }: LoaderArgs) => {
  const topic = await getTopic(params.slug);
  return json({ topic });
};

export default function TopicSlug() {
  const { topic } = useLoaderData<typeof loader>();
  return (
    <div className="rounded-lg m-3 border-dotted border-2 border-sky-500 text-3xl text-center font-extrabold bg-zinc-800">
    <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
      {topic.title}
    </span>
  </div>
  );
}