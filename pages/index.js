import Head from "next/head";

export default function Home() {
  return (
    <div className="container">
      <Head>
        <title>Jason Kim's Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header className="container mx-auto">
        <h1>Jason Kim's Blog</h1>
      </header>

      <main className="main"></main>

      <footer></footer>
    </div>
  );
}
