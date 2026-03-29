import fs from "fs/promises";
import path from "path";

export interface Post {
  id: string;
  slug: string;
  title: string;
  tags: string[];
  coverImage: string;
  excerpt: string;
  content: string;
  author: string;
  date: string;
}

const DATA_FILE = path.join(process.cwd(), "data", "posts.json");

export async function getPosts(): Promise<Post[]> {
  const data = await fs.readFile(DATA_FILE, "utf8");
  const posts: Post[] = JSON.parse(data);

  return posts.sort(
    (a, b) =>
      new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getPostBySlug(
  slug: string
): Promise<Post | undefined> {
  const posts = await getPosts();
  return posts.find((p) => p.slug === slug);
}