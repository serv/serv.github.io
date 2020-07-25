import Link from "next/link";

export default function Header() {
  return (
    <header className="pt-16 pb-12">
      <Link as={`/`} href="/">
        <a className="hover:underline">
          <h1>Jason Kim's Blog</h1>
        </a>
      </Link>
    </header>
  );
}
