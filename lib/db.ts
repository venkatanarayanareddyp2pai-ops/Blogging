import fs from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { Redis } from "@upstash/redis";

// Initialize Redis client - try multiple environment variable combinations
const redis = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN
  ? new Redis({
      url: process.env.UPSTASH_REDIS_REST_URL,
      token: process.env.UPSTASH_REDIS_REST_TOKEN,
    })
  : process.env.KV_REST_API_URL && process.env.KV_REST_API_TOKEN
  ? new Redis({
      url: process.env.KV_REST_API_URL,
      token: process.env.KV_REST_API_TOKEN,
    })
  : null;

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
const USE_KV = !!redis;

// Helper to ensure initial state on Redis
async function ensureRedisReady(): Promise<Post[]> {
  if (!redis) {
    throw new Error("Redis client not initialized");
  }
  
  try {
    const data = await redis.get<Post[]>("posts");
    if (!data) {
      // Seed with local data if Redis is empty
      const localData = await fs.readFile(DATA_FILE, "utf8").catch(() => "[]");
      const posts: Post[] = JSON.parse(localData);
      await redis.set("posts", posts);
      return posts;
    }
    return data;
  } catch (error) {
    console.error("Redis Error initializing data. Falling back to empty array.", error);
    return [];
  }
}

export async function getPosts(): Promise<Post[]> {
  let posts: Post[] = [];
  if (USE_KV) {
    posts = await ensureRedisReady();
  } else {
    try {
      const data = await fs.readFile(DATA_FILE, "utf8");
      posts = JSON.parse(data);
    } catch {
      posts = []; // Fallback to empty if file missing
    }
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
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
  
  if (USE_KV) {
    if (!redis) throw new Error("Redis client not available");
    await redis.set("posts", posts);
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
  }
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
  
  if (USE_KV) {
    if (!redis) throw new Error("Redis client not available");
    await redis.set("posts", posts);
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(posts, null, 2));
  }
}

export async function deletePost(id: string): Promise<void> {
  const posts = await getPosts();
  const filteredPosts = posts.filter(p => p.id !== id);
  
  if (filteredPosts.length === posts.length) {
    throw new Error('Post not found');
  }
  
  if (USE_KV) {
    if (!redis) throw new Error("Redis client not available");
    await redis.set("posts", filteredPosts);
  } else {
    await fs.writeFile(DATA_FILE, JSON.stringify(filteredPosts, null, 2));
  }
}