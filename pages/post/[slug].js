import Head from "next/head";
import Post from "../../lib/post";
import markdownToHtml from "../../lib/markdownToHtml";

export default function PostPage({ post }) {
  return (
    <div className="container mx-auto">
      <Head>
        <title>Jason Kim's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="py-8">
        <h1>Jason Kim's Blog</h1>
      </header>

      <main className="main pb-8">
        <div>{post.title}</div>
        <div>{post.createdAt}</div>
        <div
          className="markdown"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
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

export async function getStaticProps({ params }) {
  const post = await Post.findBySlug(params.slug);

  const content = await markdownToHtml(post.content || "");

  return {
    props: {
      post: {
        ...post,
        content
      }
    }
  };
}

export async function getStaticPaths() {
  const posts = await Post.all();

  return {
    paths: posts.map((p) => {
      return {
        params: {
          slug: p.slug
        }
      };
    }),
    fallback: false
  };
}
