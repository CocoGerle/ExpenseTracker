import { db } from "../database/index.js";
import { posts } from "../database/schema.js";

export const getPosts = async (_, res) => {
  const posts = await db.query.posts.findMany();

  res.json(posts);
};

export const createPost = async (req, res) => {
  const { title, content, userId } = req.body;

  const post = await db
    .insert(posts)
    .values({ title, content, userId })
    .returning();

  res.json(post);
};
