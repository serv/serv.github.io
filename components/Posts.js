import React from "react";
import moment from "moment";
import Link from "next/link";

export default function Posts({ posts }) {
  const result = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];
    const createdAt = moment(post.createdAt, "YYYY-MM-DD").format("YYYY-MM-DD");

    result.push(
      <div key={i} className="flex pb-4">
        <div className="whitespace-no-wrap text-gray-600 pr-4">{createdAt}</div>
        <div className="">
          <Link as={`/post/${post.slug}`} href="/post/[slug]">
            <a className="hover:underline">{post.title}</a>
          </Link>
        </div>
      </div>
    );
  }

  return <React.Fragment>{result}</React.Fragment>;
}