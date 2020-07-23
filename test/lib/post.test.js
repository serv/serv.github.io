const { expect } = require("chai");

function validatePost(post) {
  expect(p.title).to.be.a("string");
  expect(p.createdAt).to.be.an("object");
}

describe("Post", () => {
  it(".all", async () => {
    const posts = await Post.all();

    expect(posts).to.be.an("array");
    for (let p of posts) {
      expect(validatePost(p)).to.be.true;
    }
  });
});
