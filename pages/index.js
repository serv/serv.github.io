import Head from "next/head";
import Posts from "../components/Posts";
import Post from "../lib/post.js";
import Header from "../components/Header";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Jason Kim's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <main className="main pb-8">
        <Posts posts={posts} />
      </main>

      <footer className="pb-10">
        <div className="flex">
          <div className="flex-initial pr-4">Personal Site</div>
          <div className="flex-initial pr-4">Github</div>
          <div className="flex-initial pr-4">Twitter</div>
          <div className="flex-initial pr-4">LinkedIn</div>
        </div>
      </footer>
    </div>
  );
}

export async function getStaticProps() {
  const posts = await Post.all();

  return {
    props: { posts }
  };
}
