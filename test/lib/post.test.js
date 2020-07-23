import Post from "../../lib/post.mjs";
import chai from "chai";
const { expect } = chai;

function validatePost(p) {
  expect(p.title).to.be.a("string");
  expect(p.createdAt.constructor.name).to.eql("Moment");
  expect(p.categories).to.be.an("array");

  for (let c of p.categories) {
    expect(c).to.be.a("string");
  }
}

function validateDate({ year, month, day }, createdAt) {
  expect(year).to.eql(createdAt.year());
  expect(month).to.eql(createdAt.month() + 1); // month() is 0 indexed.
  expect(day).to.eql(createdAt.date());
}

describe("Post", () => {
  it(".all", async () => {
    const posts = await Post.all();

    expect(posts).to.be.an("array");
    for (let p of posts) {
      validatePost(p);
    }
  });

  it(".init", () => {
    const mock = {
      layout: "post",
      title: "Easily Overlook Parts on Developing REST API",
      date: "2016-10-09 09:45:58 -0700",
      comments: true,
      categories: ["api", "rest"]
    };
    const post = Post.init(mock);

    expect(post.title).to.eql(mock.title);
    expect(post.categories).to.eql(mock.categories);
    validateDate({ year: 2016, month: 10, day: 9 }, post.createdAt);
  });
});
