import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import moment from "moment";
import slug from "slug";
const { readdir, readFile } = fs.promises;

const postsDirectory = join(process.cwd(), "_posts");

export default class Post {
  static async all() {
    let files;

    try {
      files = await readdir("_posts");
    } catch (err) {
      throw err;
    }

    let fileContents;
    let toReturn = [];

    try {
      for (let filename of files) {
        const fullPath = join(postsDirectory, filename);
        fileContents = await readFile(fullPath, "utf-8");
        const { data, content } = matter(fileContents);
        const post = Post.init(data, fullPath, content);
        toReturn.push(post);
      }
    } catch (err) {
      throw err;
    }

    return toReturn.reverse();
  }

  static async findBySlug(realSlug) {
    const posts = await Post.all();

    return posts.find((el) => {
      return el.slug === realSlug;
    });
  }

  static init(data, fullPath, content) {
    const { title, date, categories } = data;

    const createdAt = moment(date, "YYYY-MM-DD").format();
    const realSlug = slug(title).replace(/\.md$/, "");

    const post = {
      title,
      createdAt,
      categories,
      slug: realSlug,
      fullPath,
      content
    };

    return post;
  }
}