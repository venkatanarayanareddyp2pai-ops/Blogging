import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";

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

export async function createPost(postData: {
  title: string;
  tags: string[];
  coverImage: string;
  content: string;
  excerpt: string;
}): Promise<void> {
  const posts = await getPosts();
  
  const slug = postData.title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
  
  const newPost: Post = {
    id: randomUUID(),
    slug,
    title: postData.title,
    tags: postData.tags,
    coverImage: postData.coverImage,
    excerpt: postData.excerpt,
    content: postData.content,
    author: "Admin", // Default author, can be changed later
    date: new Date().toISOString(),
  };
  
  posts.push(newPost);
  
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

export async function updatePost(
  id: string,
  updates: Partial<Pick<Post, 'title' | 'tags' | 'coverImage' | 'content' | 'excerpt'>>
): Promise<void> {
  const posts = await getPosts();
  const index = posts.findIndex(p => p.id === id);
  
  if (index === -1) {
    throw new Error('Post not found');
  }
  
  posts[index] = { ...posts[index], ...updates };
  
  await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
}

export async function deletePost(id: string): Promise<void> {
  const posts = await getPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) {
    throw new Error('Post not found');
  }
  
  await fs.writeFile(DATA_FILE, JSON.stringify(filteredPosts, null, 2));
}