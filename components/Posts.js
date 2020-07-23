import React from "react";

export default function Posts({ posts }) {
  const result = [];

  for (let i = 0; i < posts.length; i++) {
    const post = posts[i];

    result.push(
      <div key={i}>
        <div className="post-created-at">{post.createdAt}</div>
        <div className="post-title">{post.title}</div>
      </div>
    );
  }

  return <React.Fragment>{result}</React.Fragment>;
}
