const fs = require("fs");
const moment = require("moment");
const slug = require("slug");

function newPost() {
  const today = moment().format("YYYY-MM-DD");
  const title = process.argv.slice(2).join(" ");
  const realSlug = slug(title);
  const fileName = `${today}-${realSlug}.md`;

  const frontMatter = `---
layout: post
title: ${title}
date: ${moment().format()}
comments: true
categories: []
---
`;

  fs.writeFile(`./_posts/${fileName}`, frontMatter, function (err) {
    console.log(err);
  });
}

newPost();
