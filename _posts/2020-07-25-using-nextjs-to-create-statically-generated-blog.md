---
layout: post
title: Using Next.js To Create Statically Generated Blog
date: 2020-07-25T11:47:38-07:00
comments: true
categories: ["next.js", "jekyll"]
---

I heard great things about [Tailwind.css](https://tailwindcss.com/) and I've wanted to
try it. I also wanted to redesign my blog and stop using
[Octopress](http://octopress.org/).
This was a good opportunity to do both by recreating my blog
using Tailwind.css and move away from using Octopress.
I wanted to make sure I understood how different internal
parts were working together to produce the static pages.
I chose [Next.js](https://nextjs.org/) as it is a popular and well maintained tool
that is capable of turning React components into static
pages.

My blog has two kinds of pages. I have an index page that fetches
all the blog posts and show the list of posts. Another page I
have is a blog post page that shows the content of the blog post.

The index page is created by getting a list of files in the
`_posts` directory where I store all the blog posts in
markdown format. I use [slug](https://www.npmjs.com/package/slug) NPM package to create a
url path for blog posts. I also have to parse the date of the
posts and format it.

The blog post page needs the content of the blog post.
In order to do that, I need to search for the blog post file
using the slug from the url path. Once I get the file,
I need to convert the markdown content to HTML using [remark](https://www.npmjs.com/package/remark).

Now that the data and rendering of the posts are ready, I used
Tailwind.css to style the website. Tailwind.css's utility class
first approach to style is wonderful to use. I haven't written
a single line of my own style. Instead all I did was
add classes to DOM. All the complexities with CSS that's not
fun to deal with is happily abstracted away.
I had to add [markdown](https://github.com/iandinwoodie/github-markdown-tailwindcss) style that was created by someone else,
but that was easy to do.

It is more work to create moving parts yourself, but knowing
how different pieces fit together gives you abiliity to
modify as you would like to. I would like to add sitemap
and RSS feed to my blog.

I have the code for the blog [here](https://github.com/serv/serv.github.io/tree/develop).

Here are some additional resources that I used to create the blog.

- [Configuring github pages](https://docs.github.com/en/github/working-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site#choosing-a-publishing-source)
- [Next.js blog example](https://github.com/vercel/next.js/tree/canary/examples/blog-starter)
