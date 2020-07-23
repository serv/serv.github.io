import Head from "next/head";
import Posts from "../components/Posts";
import Post from "../lib/post.js";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Jason Kim's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-8">
        <h1>Jason Kim's Blog</h1>
      </header>

      <main className="main">
        <Posts posts={posts} />
      </main>

      <footer></footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await Post.all();

  return {
    props: { posts }
  };
}
