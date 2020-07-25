import Link from "next/link";

function functionFooterlink({ href, text, key }) {
  return (
    <a className="flex-initial pr-4 hover:underline" href={href} key={key}>
      {text}
    </a>
  );
}

export default function Footer() {
  const links = [
    { href: "http://jasonkim.ca/", text: "Personal Site" },
    { href: "https://github.com/serv", text: "Github" },
    {
      href: "https://www.linkedin.com/in/jason-kim-a2b97b6/",
      text: "Linkedin"
    },
    { href: "https://twitter.com/jasoki", text: "Twitter" }
  ];

  const linksComponents = [];
  for (let i = 0; i < links.length; i++) {
    let link = links[i];
    linksComponents.push(functionFooterlink({ ...link, key: i + 1 }));
  }

  return (
    <footer className="pb-12">
      <div className="flex">{linksComponents}</div>
    </footer>
  );
}
