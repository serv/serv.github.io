import Head from "next/head";
import Posts from "../components/Posts";
import Post from "../lib/post.js";
import Header from "../components/Header";
import Footer from "../components/Footer";

export default function Home({ posts }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Jason Kim's Blog</title>
        <link rel="icon" href="/favicon.ico" />

        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-28018879-10"
        />

        <script
          dangerouslySetInnerHTML={{
            __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-28018879-10');
        `
          }}
        />
      </Head>

      <Header />

      <main className="main pb-8">
        <Posts posts={posts} />
      </main>

      <Footer />
    </div>
  );
}

export async function getStaticProps() {
  const posts = await Post.all();

  return {
    props: { posts }
  };
}
