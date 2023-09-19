import db from "../database/database";
import { Post } from "../protocols/post-protocol";

const TABLE_NAME = "posts";
/*

Querys:

ALTER TABLE posts
ADD COLUMN createdAt timestamp DEFAULT current_timestamp;

ALTER TABLE posts
RENAME COLUMN body TO content;

CREATE TYPE post_data AS (
    date_created timestamp,
    content text
);

ALTER TABLE posts
ALTER COLUMN content SET DATA TYPE post_data;

*/
export type CreatePost = Omit<Post, "id">

async function getPosts() {
  const result = await db.query<Post>(`
    SELECT * FROM ${TABLE_NAME} 
  `);

  return result.rows;
}

async function getPost(id: number) {
  const result = await db.query<Post>(`
    SELECT * FROM ${TABLE_NAME} WHERE id = $1
  `, [id]);

  return result.rows;
}

async function createPost(post: CreatePost) {
  const { username, title, content, createAt } = post;
  const result = await db.query<Post>(`
    INSERT INTO ${TABLE_NAME} (username, title, content, "createAt") VALUES ($1, $2, $3, $4)
  `, [username, title, content, createAt]);

  return result.rowCount;
}

async function deletePost(id: number) {
  const result = await db.query<Post>(`
    DELETE FROM ${TABLE_NAME} WHERE id = $1
  `, [id]);

  return result.rowCount;
}

const postRepository = {
  getPost,
  getPosts,
  createPost,
  deletePost
}

export default postRepository;