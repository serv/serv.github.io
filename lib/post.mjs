import fs from "fs";
import { join } from "path";
import matter from "gray-matter";
import moment from "moment";
const { readdir, readFile } = fs.promises;

const postsDirectory = join(process.cwd(), "_posts");

export default class Post {
  constructor({ title, createdAt, categories }) {
    this.title = title;
    this.createdAt = createdAt;
    this.categories = categories;
  }

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
        const post = Post.init(data);
        toReturn.push(post);
      }
    } catch (err) {
      throw err;
    }

    return toReturn;
  }

  static init(data) {
    const { title, date, categories } = data;

    const createdAt = moment(date, "YYYY-MM-DD");

    const post = new Post({
      title,
      createdAt,
      categories
    });

    return post;
  }
}
